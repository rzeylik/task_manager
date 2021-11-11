class AddListIdToTask < ActiveRecord::Migration[6.0]
  def change
    add_reference :tasks, :list, null: false, foreign_key: true
    remove_reference :tasks, :board, index: true, foreign_key: true
  end
end
