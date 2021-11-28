class TaskBlueprint < Blueprinter::Base
  fields :description

  field :card_id, name: :id
  field :name, name: :title
  field :list_name do |task|
    task.list.name
  end
  field :due_to do |task|
    task.due_to&.strftime('%Y-%m-%dT%H:%M')
  end

  # view :with_list do
  #   association :list
  # end

  view :with_history do
    association :task_histories, name: :actions, blueprint: TaskHistoryBlueprint
    association :task_assignments, name: :assignments, blueprint: TaskAssignmentBlueprint
  end

  view :pusher do
    field :lane_id do |task|
      task.list.lane_id
    end
  end
end
