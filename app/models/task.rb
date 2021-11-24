class Task < ApplicationRecord
  belongs_to :list
  has_one :board, through: :list
  has_many :task_histories, -> { order(created_at: :desc) }, dependent: :destroy
  has_many :task_assignments, dependent: :destroy
  has_many :users, through: :task_assignments
end
