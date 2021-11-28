class BoardBlueprint < Blueprinter::Base
  identifier :id

  fields :name

  field :image do |board|
    board.image.url
  end

  view :with_lists do
    association :lists, name: :lanes, blueprint: ListBlueprint, view: :show
  end
end
