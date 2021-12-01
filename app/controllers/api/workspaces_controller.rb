class Api::WorkspacesController < ApplicationController

  def index
    render json: {
      own_workspaces: WorkspaceBlueprint.render_as_hash(current_user.own_workspaces),
      invited_workspaces: WorkspaceBlueprint.render_as_hash(current_user.invited_workspaces),
      boards: BoardBlueprint.render_as_hash(current_user.boards)
    }
  end

  def edit
    workspace = Workspace.find params[:id]
    render json: WorkspaceBlueprint.render(workspace)
  end

  def create
    workspace = Workspace.create(owner: current_user, name: params[:name])
    WorkspaceRight.create(workspace: workspace, user: current_user)

    render json: WorkspaceBlueprint.render_as_hash(current_user.own_workspaces)
  end

  def add_board
    workspace = Workspace.find params[:id]

    return unless workspace.owner == current_user

    board = Board.new(workspace: workspace, owner: current_user, name: params[:name])
    board.save

    Pusher.trigger("workspace-channel-#{workspace.id}", 'workspace-update',
                   WorkspaceBlueprint.render_as_hash(workspace))

    render json: WorkspaceBlueprint.render_as_hash(current_user.own_workspaces)
  end

  def add_user
    workspace = Workspace.find params[:id]
    user = User.find_by_email params[:email]

    render json: { message: "User doesn't exist" } and return unless user
    render json: { message: 'User is already invited to this workspace' } and return if workspace.users.include?(user)

    WorkspaceRight.create(workspace: workspace, user: user)
    render json: { message: 'User invited successfully' }
  end

  def remove_user
    workspace = Workspace.find params[:id]
    user = User.find params[:user_id]
    workspace_right = WorkspaceRight.where(user: user, workspace: workspace).first
    return unless workspace_right
    workspace_right.destroy
  end
end
