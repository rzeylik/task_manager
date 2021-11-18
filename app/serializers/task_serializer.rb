class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title

  def title
    object.name
  end

  def id
    object.card_id
  end
end
