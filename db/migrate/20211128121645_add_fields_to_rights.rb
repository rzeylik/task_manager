class AddFieldsToRights < ActiveRecord::Migration[6.0]
  def change
    add_reference :workspaces, :user, index: true
    add_reference :boards, :user, index: true
    add_column :workspace_rights, :can_add_boards, :boolean, default: false
    add_column :board_rights, :can_edit, :boolean, default: true
  end
end
