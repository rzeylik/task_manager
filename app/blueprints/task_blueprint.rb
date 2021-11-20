class TaskBlueprint < Blueprinter::Base
  field :card_id, name: :id
  field :name, name: :title
  field :list_name do |task|
    task.list.name
  end

  # view :with_list do
  #   association :list
  # end

  view :with_history do
    association :task_histories, name: :actions, blueprint: TaskHistoryBlueprint
  end

end
