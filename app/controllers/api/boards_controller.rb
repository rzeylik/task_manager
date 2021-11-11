class Api::BoardsController < ApplicationController
  def index
    boards = current_user.all_boards
    render json: boards
  end

  def show
    board = Board.find params[:id]
    render json: board.lists
  end
end
