class UpdateBoardRights < ActiveRecord::Migration[6.0]
  def change
    rename_column :board_rights, :can_edit, :can_edit_tasks
    add_column :board_rights, :can_edit_lists, :boolean, default: false
    add_column :board_rights, :can_move_tasks, :boolean, default: false
    add_column :board_rights, :can_move_lists, :boolean, default: false
    add_column :board_rights, :is_admin, :boolean, default: false
  end
end
