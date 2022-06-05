class Api::BoardMessagesController < ApplicationController
  def index
    board = Board.find params[:board_id]
    authorize! :read, board
    last_message_id = params[:last_message_id]
    if last_message_id.present?
      messages = board.messages.order(:id).where('id < ?', last_message_id).last(10)
    else
      messages = board.messages.includes(:user).order(:id).last(10)
    end

    render json: BoardMessageBlueprint.render(messages, view: :with_user)
  end

  def create
    bm = BoardMessage.new(board_message_params)
    bm.user = current_user
    bm.board_id = params[:board_id]
    authorize! :create, bm
    bm.save
    render json: BoardMessageBlueprint.render(bm, view: :with_user), status: 201
    Pusher.trigger("chat-channel-#{params[:board_id]}", 'add-message', BoardMessageBlueprint.render_as_hash(bm, view: :with_user), { socket_id: params[:socket_id] })
  end

  private

  def board_message_params
    params.require(:board_message).permit(:text)
  end
end
