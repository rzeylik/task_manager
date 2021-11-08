class CreateWorkspaceRights < ActiveRecord::Migration[6.0]
  def change
    create_table :workspace_rights do |t|
      t.references :user, null: false, foreign_key: true
      t.references :workspace, null: false, foreign_key: true

      t.timestamps
    end
  end
end
