class AddBgColorToTask < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :bg_color, :string
  end
end
