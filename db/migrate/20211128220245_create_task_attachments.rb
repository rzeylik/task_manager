class CreateTaskAttachments < ActiveRecord::Migration[6.0]
  def change
    create_table :task_attachments do |t|
      t.string :attachment
      t.references :task, null: false, foreign_key: true

      t.timestamps
    end
  end
end
