class List < ApplicationRecord
  has_many :tasks, -> { order(position: :asc) }, dependent: :destroy
  belongs_to :board
end
