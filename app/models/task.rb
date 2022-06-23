class Task < ApplicationRecord
  belongs_to :list
  has_one :board, through: :list
  has_many :task_histories, -> { order(created_at: :desc) }
  has_many :task_assignments, dependent: :destroy
  has_many :users, through: :task_assignments
  has_many :task_attachments, dependent: :destroy
  has_many :task_relations, foreign_key: :parent_id, dependent: :destroy
  has_many :children, through: :task_relations, dependent: :destroy
  has_many :task_track_times, dependent: :destroy
end
