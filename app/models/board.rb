class Board < ApplicationRecord
  belongs_to :workspace
  has_many :lists, -> { order(position: :asc) }, dependent: :destroy
  has_many :tasks, through: :lists
  has_many :board_rights, dependent: :destroy
  has_many :users, through: :board_rights
  has_many :messages, class_name: 'BoardMessage'
  belongs_to :owner, foreign_key: :user_id, class_name: 'User'
  has_many :task_histories

  mount_uploader :image, ImageUploader

  enum image_mode: { auto: 0, cover: 1, contain: 2 }

  def all_users
    (workspace.users + users).uniq
  end
end
