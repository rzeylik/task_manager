class Api::WorkspacesController < ApplicationController

  def index
    workspaces = current_user.workspaces
    render json: workspaces
  end
end
