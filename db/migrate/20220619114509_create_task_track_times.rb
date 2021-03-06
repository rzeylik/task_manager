class CreateTaskTrackTimes < ActiveRecord::Migration[6.0]
  def change
    create_table :task_track_times do |t|
      t.references :user, null: false, foreign_key: true
      t.references :task, null: false, foreign_key: true
      t.interval :duration

      t.timestamps
    end
  end
end
