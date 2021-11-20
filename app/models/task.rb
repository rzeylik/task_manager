class Task < ApplicationRecord
  belongs_to :list
  has_many :task_histories, -> { order(created_at: :desc) }, dependent: :destroy
end
