class Board < ApplicationRecord
  belongs_to :workspace
  has_many :lists, -> { order(position: :asc) }, dependent: :destroy
  has_many :tasks, through: :lists
  has_many :board_rights, dependent: :destroy
  has_many :users, through: :board_rights
  belongs_to :owner, foreign_key: :user_id, class_name: 'User'

  mount_uploader :image, ImageUploader

  def all_users
    (workspace.users + users).uniq
  end
end
