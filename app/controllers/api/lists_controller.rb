class Api::ListsController < ApplicationController
  def create
    board = Board.find params[:board_id]
    list = List.new(list_params)
    list.position = board.lists.last.position + 1
    list.board = board
    if list.save
      head :ok
    else
      head 422
    end
  end

  def change_position
    board = Board.find params[:board_id]
    from = params[:from]
    to = params[:to]

    current_list = List.find_by_position from

    if from < to
      lists = board.lists.where(position: (from + 1)..to)
      lists.update_all('position = (position - 1)')
    else
      lists = board.lists.where(position: to..(from - 1))
      lists.update_all('position = (position + 1)')
    end

    current_list.position = to
    current_list.save
  end

  private

  def list_params
    params.require(:list).permit(:name)
  end
end
