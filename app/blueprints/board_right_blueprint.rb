class BoardRightBlueprint < Blueprinter::Base
  identifier :id

  fields :can_edit_tasks, :can_edit_lists, :can_move_tasks, :can_move_lists, :is_admin

  view :with_user do
    association :user, blueprint: UserBlueprint
  end
end
