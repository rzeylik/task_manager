class AddNewFiedlsToTask < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :description, :text
    add_column :tasks, :due_to, :datetime
    add_column :tasks, :started_at, :date
  end
end
