class UserBlueprint < Blueprinter::Base
  identifier :id

  field :email, name: :username
end
