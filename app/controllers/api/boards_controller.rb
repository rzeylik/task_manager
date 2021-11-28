class Api::BoardsController < ApplicationController
  before_action :set_board, only: [:show]
  before_action :user_have_access?, only: [:show]

  def index
    boards = current_user.all_boards
    render json: boards
  end

  def show
    board = Board.find params[:id]
    render json: BoardBlueprint.render(board, view: :with_lists)
  end

  def add_image
    board = Board.find params[:id]
    board.image = params[:image]
    board.save
  end

  private

  def set_board
    @board = Board.find params[:id]
  end

  def user_have_access?
    head 403 and return unless current_user.all_boards.include?(@board)
  end
end
