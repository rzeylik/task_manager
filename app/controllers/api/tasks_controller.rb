class Api::TasksController < ApplicationController
  def create
    list = List.find params[:list_id]
    task = Task.new(task_params)

    if list.tasks.any?
      task.position = list.tasks.last.position + 1
    else
      task.position = 0
    end

    task.list = list
    if task.save
      render json: task.id
    else
      head 422
    end
  end

  def change_position
    board = Board.find params[:board_id]
    task = Task.find params[:task_id]

    from_list_id = params[:from_list_id]
    to_list_id = params[:to_list_id]

    from = task.position
    to = params[:position]

    if from_list_id == to_list_id
      list = List.find from_list_id

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
      from_list = List.find from_list_id
      to_list = List.find to_list_id

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
    params.require(:task).permit(:name)
  end
end
