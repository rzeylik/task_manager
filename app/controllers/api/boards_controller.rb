class Api::BoardsController < ApplicationController
  before_action :set_board, only: [:show]
  before_action :user_have_access?, only: [:show]

  def index
    boards = current_user.all_boards
    render json: BoardBlueprint.render(boards)
  end

  def show
    board = Board.find params[:id]
    render json: BoardBlueprint.render(board, view: :with_lists)
  end

  def destroy
    board = Board.find params[:id]
    return unless board.owner == current_user

    board.destroy
  end

  def add_image
    board = Board.find params[:id]
    board.image = params[:image]
    board.save
  end

  def add_user
    board = Board.find params[:id]
    user = User.find_by_email params[:email]

    render json: { message: "User doesn't exist" } and return unless user
    render json: { message: 'User is already invited to this board' } and return if board.all_users.include?(user)

    BoardRight.create(board: board, user: user)
    render json: { message: 'User invited successfully' }
  end

  def remove_user
    board = Board.find params[:id]
    user = User.find params[:user_id]

    board_right = BoardRight.where(board: board, user: user).first
    return unless board_right

    board_right.destroy
  end

  private

  def set_board
    @board = Board.find params[:id]
  end

  def user_have_access?
    head 403 and return unless current_user.all_boards.include?(@board)
  end
end
