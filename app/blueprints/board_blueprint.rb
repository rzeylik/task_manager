class BoardBlueprint < Blueprinter::Base
  identifier :id

  fields :name
  field :user_id, name: :owner_id

  field :image do |board|
    board.image.url
  end

  view :with_lists do
    association :lists, name: :lanes, blueprint: ListBlueprint, view: :show
    field :users do |board|
      {
        all_users: UserBlueprint.render_as_hash(board.all_users),
        board_users: UserBlueprint.render_as_hash(board.users),
        workspace_users: UserBlueprint.render_as_hash(board.workspace.users)
      }
      # UserBlueprint.render_as_hash(board.all_users)
    end
  end
end
