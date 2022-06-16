class AddImageModeToBoard < ActiveRecord::Migration[6.0]
  def change
    add_column :boards, :image_mode, :integer, default: 0
  end
end
