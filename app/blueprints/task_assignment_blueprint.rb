class TaskAssignmentBlueprint < Blueprinter::Base
  identifier :id

  field :user_name do |assignment|
    assignment.user.email
  end

end
