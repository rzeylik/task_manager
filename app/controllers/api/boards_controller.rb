class Api::BoardsController < ApplicationController
  before_action :set_board, only: %i[show destroy add_image update_image_mode add_user remove_user settings permissions activity]
  before_action :user_have_access?, only: [:show]

  def index
    boards = current_user.all_boards
    render json: BoardBlueprint.render(boards)
  end

  def show
    authorize! :show, @board
    render json: BoardBlueprint.render(@board, view: :with_lists_and_users)
  end

  def destroy
    authorize! :destroy, @board

    @board.destroy
  end

  def add_image
    authorize! :add_image, @board

    @board.image = params[:image]
    @board.save
  end

  def update_image_mode
    authorize! :add_image, @board

    @board.image_mode = params[:image_mode]
    @board.save
  end

  def add_user
    authorize! :edit, @board
    user = User.find_by_email params[:email]

    render json: { message: "User doesn't exist" } and return unless user
    render json: { message: 'User is already invited to this board' } and return if @board.all_users.include?(user)

    BoardRight.create(board: @board, user: user)
    render json: { message: 'User invited successfully' }
  end

  def remove_user
    authorize! :edit, @board
    user = User.find params[:user_id]

    board_right = BoardRight.where(board: @board, user: user).first
    return unless board_right

    board_right.destroy
  end

  def permissions
    authorize! :show, @board

    if @board.workspace.users.include? current_user
      render json: { can_edit_tasks: true, can_edit_lists: true, can_move_tasks: true, can_move_lists: true, is_admin: true }
    else
      board_right = BoardRight.find_by(board: @board, user: current_user)
      render json: BoardRightBlueprint.render(board_right)
    end
  end

  def activity
    authorize! :show, @board

    last_activity_id = params[:last_activity_id]
    if last_activity_id.present?
      activities = @board.task_histories.includes(:user).order(:id).where('id < ?', last_activity_id).last(15)
    else
      activities = @board.task_histories.includes(:user).order(:id).last(15)
    end

    response = {
      data: TaskHistoryBlueprint.render_as_hash(activities, view: :activity),
      is_last: activities.first&.id == @board.task_histories.first&.id
    }

    render json: response
  end

  def settings
    authorize! :manage, @board

    render json: BoardBlueprint.render(@board, view: :with_users), status: :ok
  end

  private

  def set_board
    @board = Board.find params[:id]
  end

  def user_have_access?
    head 403 unless current_user.all_boards.include?(@board)
  end
end
