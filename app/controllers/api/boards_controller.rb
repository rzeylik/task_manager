class Api::BoardsController < ApplicationController

  def index
    boards = current_user.all_boards
    render json: boards
  end
end
