class ListSerializer < ActiveModel::Serializer
  attributes :id, :title, :cards

  def id
    object.id.to_s
  end

  def title
    object.name
  end

  def cards
    object.tasks.map do |task|
      TaskSerializer.new(task)
    end
  end
end
