class TaskAssignmentBlueprint < Blueprinter::Base
  identifier :id

  association :user, blueprint: UserBlueprint
end
