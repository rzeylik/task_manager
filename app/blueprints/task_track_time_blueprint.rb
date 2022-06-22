class TaskTrackTimeBlueprint < Blueprinter::Base
  identifier :id

  field :duration

  association :user, blueprint: UserBlueprint
end
