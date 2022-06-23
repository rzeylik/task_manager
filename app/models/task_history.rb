class TaskHistory < ApplicationRecord
  belongs_to :task, optional: true
  belongs_to :board
  belongs_to :user

  after_create_commit :pusher_event

  def self.create_with_task(task:, **params)
    th = TaskHistory.new(params)
    th.task = task
    th.board = task.board
    th.name = "#{task.name} (#{task.list.name})"
    th.users_to_notify = task.users.pluck(:id)
    th.save
  end

  def pusher_event
    Pusher.trigger("activity-channel-#{board_id}", 'add-activity',
                   TaskHistoryBlueprint.render_as_hash(self, view: :activity))
  end
end
