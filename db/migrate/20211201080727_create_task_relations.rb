class CreateTaskRelations < ActiveRecord::Migration[6.0]
  def change
    create_table :task_relations do |t|
      t.references :parent, index: true, null: false, foreign_key: { to_table: :tasks }
      t.references :child, index: true, null: false, foreign_key: { to_table: :tasks }

      t.timestamps
    end
  end
end
