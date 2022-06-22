class TaskTrackTime < ApplicationRecord
  belongs_to :user
  belongs_to :task

  validates :duration, presence: true
end
