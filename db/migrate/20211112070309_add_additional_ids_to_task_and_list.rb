class AddAdditionalIdsToTaskAndList < ActiveRecord::Migration[6.0]
  def change
    add_column :lists, :lane_id, :string
    add_column :tasks, :card_id, :string
  end
end
