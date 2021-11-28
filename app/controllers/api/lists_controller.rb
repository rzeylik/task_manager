class Api::ListsController < ApplicationController
  before_action :set_board, only: [:create, :change_position, :destroy]
  after_action :lanes_pusher, only: [:destroy, :change_position]

  def create
    list = List.new(list_params)
    if @board.lists.any?
      list.position = @board.lists.last.position + 1
    else
      list.position = 0
    end
    list.board = @board
    if list.save
      head :ok
      lanes_pusher
    else
      head 422
    end
  end

  def destroy
    list = List.find_by_lane_id params[:lane_id]
    list.destroy
  end

  def change_position
    list = List.find_by_lane_id params[:lane_id]

    from = list.position
    to = params[:to]

    if from < to
      lists = @board.lists.where(position: (from + 1)..to)
      lists.update_all('position = (position - 1)')
    else
      lists = @board.lists.where(position: to..(from - 1))
      lists.update_all('position = (position + 1)')
    end

    list.position = to
    list.save
  end

  private

  def set_board
    @board = Board.find params[:board_id]
  end

  def lanes_pusher
    Pusher.trigger("board-channel-#{params[:board_id]}", 'lanes-event',
                   ListBlueprint.render_as_hash(@board.lists, view: :pusher),
                   { socket_id: params[:socket_id] })
  end

  def list_params
    params.require(:list).permit(:name, :lane_id)
  end
end
