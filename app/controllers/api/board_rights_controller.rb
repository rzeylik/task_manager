class Api::BoardRightsController < ApplicationController
  def update
    board_right = BoardRight.find params[:id]
    authorize! :edit, board_right.board

    board_right.update_attributes(board_right_params)

    render json: { message: 'Board right updated successfully' }
  end

  private

  def board_right_params
    params.require(:board_right).permit(:can_edit_tasks, :can_edit_lists, :can_move_tasks, :can_move_lists, :is_admin)
  end
end
