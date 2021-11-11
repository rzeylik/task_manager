class Board < ApplicationRecord
  belongs_to :workspace
  has_many :lists, -> { order(position: :asc) }
  has_many :tasks, through: :lists
end
