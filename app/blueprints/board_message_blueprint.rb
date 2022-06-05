class BoardMessageBlueprint < Blueprinter::Base
  identifier :id

  fields :text, :user_id, :created_at

  field :created_at do |board_message|
    board_message.created_at.strftime('%d/%m/%Y %H:%M')
  end

  field :created_at_time do |board_message|
    board_message.created_at.strftime('%H:%M')
  end

  view :with_user do
    association :user, blueprint: UserBlueprint
  end
end
