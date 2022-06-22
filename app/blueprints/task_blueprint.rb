class TaskBlueprint < Blueprinter::Base
  fields :description, :bg_color

  field :card_id, name: :id
  field :name, name: :title
  field :list_name do |task|
    task.list.name
  end
  field :due_to do |task|
    task.due_to&.strftime('%Y-%m-%dT%H:%M')
  end

  association :task_assignments, name: :assignments, blueprint: TaskAssignmentBlueprint

  view :with_history do
    association :task_histories, name: :actions, blueprint: TaskHistoryBlueprint
    association :task_attachments, name: :attachments, blueprint: TaskAttachmentBlueprint
    association :task_track_times, name: :track_times, blueprint: TaskTrackTimeBlueprint
    association :children, name: :related_cards, blueprint: TaskBlueprint
  end

  view :pusher do
    field :lane_id do |task|
      task.list.lane_id
    end
  end

  view :only_title do
    excludes :due_to, :description, :task_assignments
  end
end
