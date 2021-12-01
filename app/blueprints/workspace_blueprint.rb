class WorkspaceBlueprint < Blueprinter::Base
  identifier :id

  fields :name
  field :user_id, name: :owner_id

  association :boards, blueprint: BoardBlueprint
  association :users, blueprint: UserBlueprint
end
