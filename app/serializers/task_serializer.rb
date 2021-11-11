class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title

  def title
    object.name
  end

  def id
    object.id.to_s
  end
end
