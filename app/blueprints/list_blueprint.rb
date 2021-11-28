class ListBlueprint < Blueprinter::Base
  field :lane_id, name: :id
  field :name, name: :title

  view :pusher do
    association :tasks, name: :cards, blueprint: TaskBlueprint, view: :pusher
  end
end
