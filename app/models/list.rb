class List < ApplicationRecord
  has_many :tasks, -> { order(position: :asc) }
  belongs_to :board
end
