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
        from_list = List.find_by_lane_id from_lane_id
        to_list = List.find_by_lane_id to_lane_id

        tasks = from_list.tasks.where('position > ?', from)
        tasks.update_all('position = (position - 1)')

        tasks = to_list.tasks.where('position <= ?', to)
        tasks.update_all('position = (position + 1)')

        task.list = to_list
        history_on_move(task)
      end


      task.position = to
      task.save
    end

    def update
      task = Task.find_by_card_id params[:id]
      task.update(task_params)
    end

    def destroy
      task = Task.find_by_card_id params[:card_id]
      from_list = task.list

      tasks = from_list.tasks.where('position > ?', task.position)
      tasks.update_all('position = (position - 1)')
      task.destroy
    end

    private

    def history_on_create(task)
      TaskHistory.create(user: current_user, task: task, action: "added this card to #{task.list.name}")
    end

    def history_on_move(task)
      TaskHistory.create(user: current_user, task: task, action: "moved this card to #{task.list.name}")
    end

    def task_params
      params.require(:task).permit(:name, :card_id, :description)
    end
  end
end
