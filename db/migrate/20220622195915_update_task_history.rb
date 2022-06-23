class UpdateTaskHistory < ActiveRecord::Migration[6.0]
  def change
    add_column :task_histories, :users_to_notify, :integer, array: true, default: []
    add_column :task_histories, :name, :text
    add_reference :task_histories, :board, index: true
  end
end
