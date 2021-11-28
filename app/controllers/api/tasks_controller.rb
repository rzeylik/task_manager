module Api
  class TasksController < ApplicationController
    def show
      task = Task.find_by_card_id params[:id]
      render json: TaskBlueprint.render(task, view: :with_history)
    end

    def create
      list = List.find_by_lane_id params[:lane_id]
      task = Task.new(task_params)

      if list.tasks.any?
        task.position = list.tasks.last.position + 1
      else
        task.position = 0
      end

      task.list = list
      if task.save
        render json: task
        history_on_create(task)
        Pusher.trigger("board-channel-#{params[:board_id]}", 'create-card-event', TaskBlueprint.render_as_hash(task, view: :pusher), { socket_id: params[:socket_id] })
      else
        head 422
      end
    end

    def change_position
      board = Board.find params[:board_id]
      task = Task.find_by_card_id params[:task_id]

      from_lane_id = params[:from_lane_id]
      to_lane_id = params[:to_lane_id]

      from = task.position
      to = params[:position]

      if from_lane_id == to_lane_id
        list = List.find_by_lane_id from_lane_id

        if from < to
          tasks = list.tasks.where(position: (from + 1)..to)
          tasks.update_all('position = (position - 1)')
        else
          tasks = list.tasks.where(position: to..(from - 1))
          tasks.update_all('position = (position + 1)')
        end
      else
        from_list = List.includes(:tasks).find_by_lane_id(from_lane_id)
        to_list = List.includes(:tasks).find_by_lane_id(to_lane_id)

        tasks = from_list.tasks.where('position > ?', from)
        tasks.update_all('position = (position - 1)')

        tasks = to_list.tasks.where('position <= ?', to)
        tasks.update_all('position = (position + 1)')

        task.list = to_list
        history_on_move(task)
      end

      task.position = to
      task.save
      Pusher.trigger("board-channel-#{params[:board_id]}", 'move-event',
                     { from_lane_id: from_lane_id, to_lane_id: to_lane_id, card_id: params[:task_id], index: to },
                     { socket_id: params[:socket_id] })
    end

    def users
      task = Task.find_by_card_id params[:id]
      render json: task.board.all_users
    end

    def users_to_assign
      task = Task.find_by_card_id params[:id]
      render json: task.board.all_users - task.users
    end

    def join
      task = Task.find_by_card_id params[:id]

      return if TaskAssignment.where(task: task, user: current_user).any?

      assignment = TaskAssignment.new(task: task, user: current_user)
      assignment.save
      history_on_join(assignment)
      Pusher.trigger("task-channel-#{task.card_id}", 'task-update',
                     TaskBlueprint.render_as_hash(task, view: :with_history))
    end

    def leave
      task = Task.find_by_card_id params[:id]
      assignment = TaskAssignment.where(task: task, user: current_user).first

      if assignment
        assignment.destroy
        history_on_leave(assignment)
        Pusher.trigger("task-channel-#{task.card_id}", 'task-update',
                       TaskBlueprint.render_as_hash(task, view: :with_history))
      end
    end

    def assign_user
    end

    def update
      task = Task.find_by_card_id params[:id]
      task.update(task_params)
      update_history(task)
      Pusher.trigger("task-channel-#{task.card_id}", 'task-update',
                     TaskBlueprint.render_as_hash(task, view: :with_history))
    end

    def destroy
      task = Task.find_by_card_id params[:card_id]
      from_list = task.list

      tasks = from_list.tasks.where('position > ?', task.position)
      tasks.update_all('position = (position - 1)')
      task.destroy
      Pusher.trigger("board-channel-#{params[:board_id]}", 'delete-card-event',
                     { lane_id: from_list.lane_id, card_id: params[:card_id] },
                     { socket_id: params[:socket_id] })
    end

    private

    # TODO
    # fix due_to if nil
    def update_history(task)
      TaskHistory.create(user: current_user, task: task, action: "set due to date to #{task.due_to.strftime('%d/%m/%Y %H:%M')}") if (task_params[:due_to])
      TaskHistory.create(user: current_user, task: task, action: 'removed due to date') if (task_params[:due_to] === nil && task_params.key?(:due_to))
    end

    def history_on_create(task)
      TaskHistory.create(user: current_user, task: task, action: "added this card to #{task.list.name}")
    end

    def history_on_move(task)
      TaskHistory.create(user: current_user, task: task, action: "moved this card to #{task.list.name}")
    end

    def history_on_join(task_assignment)
      TaskHistory.create(user: task_assignment.user, task: task_assignment.task, action: 'joined this card')
    end

    def history_on_leave(task_assignment)
      TaskHistory.create(user: task_assignment.user, task: task_assignment.task, action: 'left this card')
    end

    def task_params
      params.require(:task).permit(:name, :card_id, :description, :due_to)
    end
  end
end
