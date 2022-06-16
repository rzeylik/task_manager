class BoardBlueprint < Blueprinter::Base
  identifier :id

  fields :name, :image_mode
  field :user_id, name: :owner_id

  field :image do |board|
    board.image.url
  end

  field :workspace do |board|
    {
      id: board.workspace.id,
      name: board.workspace.name
    }
  end

  view :with_lists_and_users do
    association :lists, name: :lanes, blueprint: ListBlueprint, view: :show
    field :users do |board|
      {
        all_users: UserBlueprint.render_as_hash(board.all_users),
        board_users: UserBlueprint.render_as_hash(board.users),
        workspace_users: UserBlueprint.render_as_hash(board.workspace.users)
      }
    end
  end

  view :with_users do
    field :users do |board|
      {
        board_users: BoardRightBlueprint.render_as_hash(board.board_rights, view: :with_user),
        workspace_users: UserBlueprint.render_as_hash(board.workspace.users)
      }
    end
  end
end
