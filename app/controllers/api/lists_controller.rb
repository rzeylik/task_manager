class Api::ListsController < ApplicationController
  def create
    board = Board.find params[:board_id]
    list = List.new(list_params)
    if board.lists.any?
      list.position = board.lists.last.position + 1
    else
      list.position = 0
    end
    list.board = board
    if list.save
      head :ok
    else
      head 422
    end
  end

  def destroy
    list = List.find_by_lane_id params[:lane_id]
    list.destroy
  end

  def change_position
    board = Board.find params[:board_id]
    list = List.find_by_lane_id params[:lane_id]

    from = list.position
    to = params[:to]

    if from < to
      lists = board.lists.where(position: (from + 1)..to)
      lists.update_all('position = (position - 1)')
    else
      lists = board.lists.where(position: to..(from - 1))
      lists.update_all('position = (position + 1)')
    end

    list.position = to
    list.save
  end

  private

  def list_params
    params.require(:list).permit(:name, :lane_id)
  end
end
