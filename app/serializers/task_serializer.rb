class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :list_name

  def title
    object.name
  end

  def id
    object.card_id
  end

  def list_name
    object.list.name
  end
end
