module Api
  class TasksController < ApplicationController
    before_action :set_task_by_card_id, only: %i[add_time remove_time]
    after_action :task_pusher, only: %i[add_time remove_time]

    def show
      task = Task.find_by_card_id params[:id]

      authorize! :read, task

      render json: TaskBlueprint.render(task, view: :with_history)
    end

    def create
      list = List.find_by_lane_id params[:lane_id]
      task = Task.new(task_params)
      task.list = list

      authorize! :create, task

      if list.tasks.any?
        task.position = list.tasks.last.position + 1
      else
        task.position = 0
      end

      if task.save
        render json: task, status: 201
        history_on_create(task)
        Pusher.trigger("board-channel-#{params[:board_id]}", 'create-card-event', TaskBlueprint.render_as_hash(task, view: :pusher), { socket_id: params[:socket_id] })
      else
        head 422
      end
    end

    def change_position
      board = Board.find params[:board_id]
      task = Task.find_by_card_id params[:task_id]
      authorize! :move, task

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
      authorize! :read, task

      render json: task.board.all_users
    end

    def users_to_assign
      task = Task.find_by_card_id params[:id]
      authorize! :read, task

      render json: task.board.all_users - task.users
    end

    def join
      task = Task.find_by_card_id params[:id]
      authorize! :update, task

      return if TaskAssignment.where(task: task, user: current_user).any?

      assignment = TaskAssignment.new(task: task, user: current_user)
      assignment.save
      history_on_join(assignment)
      Pusher.trigger("task-channel-#{task.card_id}", 'task-update',
                     TaskBlueprint.render_as_hash(task, view: :with_history))
      Pusher.trigger("board-channel-#{task.board.id}", 'lanes-event',
                     ListBlueprint.render_as_hash(task.board.lists, view: :pusher),
                     { socket_id: params[:socket_id] })
    end

    def leave
      task = Task.find_by_card_id params[:id]
      authorize! :update, task

      assignment = TaskAssignment.where(task: task, user: current_user).first

      if assignment
        assignment.destroy
        history_on_leave(assignment)
        Pusher.trigger("task-channel-#{task.card_id}", 'task-update',
                       TaskBlueprint.render_as_hash(task, view: :with_history))
        Pusher.trigger("board-channel-#{task.board.id}", 'lanes-event',
                       ListBlueprint.render_as_hash(task.board.lists, view: :pusher),
                       { socket_id: params[:socket_id] })
      end
    end

    def assign_user
      task = Task.find_by_card_id params[:id]
      user = User.find params[:user_id]
      authorize! :update, task

      return if TaskAssignment.where(task: task, user: user).any?

      assignment = TaskAssignment.new(task: task, user: user)
      assignment.save
      history_on_join(assignment)
      Pusher.trigger("task-channel-#{task.card_id}", 'task-update',
                     TaskBlueprint.render_as_hash(task, view: :with_history))
      Pusher.trigger("board-channel-#{task.board.id}", 'lanes-event',
                     ListBlueprint.render_as_hash(task.board.lists, view: :pusher),
                     { socket_id: params[:socket_id] })
    end

    def unassign_user
      task = Task.find_by_card_id params[:id]
      user = User.find params[:user_id]
      authorize! :update, task

      assignment = TaskAssignment.where(task: task, user: user).first
      if assignment
        assignment.destroy
        history_on_leave(assignment)
        Pusher.trigger("task-channel-#{task.card_id}", 'task-update',
                       TaskBlueprint.render_as_hash(task, view: :with_history))
        Pusher.trigger("board-channel-#{task.board.id}", 'lanes-event',
                       ListBlueprint.render_as_hash(task.board.lists, view: :pusher),
                       { socket_id: params[:socket_id] })
      end
    end

    def attach_file
      task = Task.find_by_card_id params[:id]
      authorize! :update, task

      return unless task

      attachment = TaskAttachment.new(task: task, attachment: params[:file])
      attachment.save
      Pusher.trigger("task-channel-#{task.card_id}", 'task-update',
                     TaskBlueprint.render_as_hash(task, view: :with_history))
    end

    def remove_file
      task = Task.find_by_card_id params[:id]
      authorize! :update, task

      return unless task

      attachment = TaskAttachment.find params[:attachment_id]
      attachment.destroy
      Pusher.trigger("task-channel-#{task.card_id}", 'task-update',
                     TaskBlueprint.render_as_hash(task, view: :with_history))
    end

    def add_time
      authorize! :update, @task
      return unless @task

      track_time = TaskTrackTime.find_by(user: current_user, task: @task)
      if track_time
        track_time.duration = params[:time]
      else
        track_time = TaskTrackTime.new(user: current_user, task: @task, duration: params[:time])
      end
      track_time.save
    end

    def remove_time
      authorize! :update, @task
      return unless @task

      track_time = TaskTrackTime.find_by(user: current_user, task: @task)
      track_time.destroy
    end

    def update
      task = Task.find_by_card_id params[:id]
      authorize! :update, task

      task.update(task_params)
      update_history(task)
      Pusher.trigger("task-channel-#{task.card_id}", 'task-update',
                     TaskBlueprint.render_as_hash(task, view: :with_history))
      Pusher.trigger("board-channel-#{task.board.id}", 'lanes-event',
                     ListBlueprint.render_as_hash(task.board.lists, view: :pusher),
                     { socket_id: params[:socket_id] })
    end

    def destroy
      task = Task.find_by_card_id params[:card_id]
      authorize! :destroy, task

      from_list = task.list

      tasks = from_list.tasks.where('position > ?', task.position)
      tasks.update_all('position = (position - 1)')
      task.destroy
      Pusher.trigger("board-channel-#{params[:board_id]}", 'delete-card-event',
                     { lane_id: from_list.lane_id, card_id: params[:card_id] },
                     { socket_id: params[:socket_id] })
    end

    private

    def set_task_by_card_id
      @task = Task.find_by_card_id params[:id]
    end

    def task_pusher
      Pusher.trigger("task-channel-#{@task.card_id}", 'task-update',
                     TaskBlueprint.render_as_hash(@task, view: :with_history))
    end

    def update_history(task)
      TaskHistory.create(user: current_user, task: task, action: "set due to date to #{task.due_to.strftime('%d/%m/%Y %H:%M')} of _name_") if (task_params[:due_to])
      TaskHistory.create(user: current_user, task: task, action: 'removed due to date of _name_') if (task_params[:due_to] === nil && task_params.key?(:due_to))
    end

    def history_on_create(task)
      TaskHistory.create(user: current_user, task: task, action: "added _name_ to #{task.list.name}")
    end

    def history_on_move(task)
      TaskHistory.create(user: current_user, task: task, action: "moved _name_ to #{task.list.name}")
    end

    def history_on_join(task_assignment)
      TaskHistory.create(user: task_assignment.user, task: task_assignment.task, action: 'joined _name_')
    end

    def history_on_leave(task_assignment)
      TaskHistory.create(user: task_assignment.user, task: task_assignment.task, action: 'left _name_')
    end

    def task_params
      params.require(:task).permit(:name, :card_id, :description, :due_to, :bg_color)
    end
  end
end
