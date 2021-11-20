class CreateTaskHistories < ActiveRecord::Migration[6.0]
  def change
    create_table :task_histories do |t|
      t.references :task, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :action

      t.timestamps
    end
  end
end
