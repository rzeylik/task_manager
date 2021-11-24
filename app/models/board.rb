class Board < ApplicationRecord
  belongs_to :workspace
  has_many :lists, -> { order(position: :asc) }
  has_many :tasks, through: :lists
  has_many :board_rights
  has_many :users, through: :board_rights

  def all_users
    (workspace.users + users).uniq
  end
end
