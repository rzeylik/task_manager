class Api::TasksController < ApplicationController
  def show
    task = Task.find_by_card_id params[:id]
    render json: task
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

      task.position = to
      task.save
    else
      from_list = List.find_by_lane_id from_lane_id
      to_list = List.find_by_lane_id to_lane_id

      tasks = from_list.tasks.where("position > ?", from)
      tasks.update_all('position = (position - 1)')

      tasks = to_list.tasks.where("position <= ?", to)
      tasks.update_all('position = (position + 1)')

      task.list = to_list
      task.position = to
      task.save
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :card_id)
  end
end
