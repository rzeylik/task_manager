class Api::TaskRelationsController < ApplicationController
  def add_relation
    child = Task.find_by_card_id params[:child_id]
    parent = Task.find_by_card_id params[:parent_id]
    relation = TaskRelation.where(child: child, parent: parent).first

    return if relation || !child || !parent

    TaskRelation.create(child: child, parent: parent)
    Pusher.trigger("task-channel-#{parent.card_id}", 'task-update',
                   TaskBlueprint.render_as_hash(parent, view: :with_history))
  end

  def remove_relation
    child = Task.find_by_card_id params[:child_id]
    parent = Task.find_by_card_id params[:parent_id]
    relation = TaskRelation.where(child: child, parent: parent).first

    return unless relation

    relation.destroy
    Pusher.trigger("task-channel-#{parent.card_id}", 'task-update',
                   TaskBlueprint.render_as_hash(parent, view: :with_history))
  end

  def cards_options
    task = Task.find_by_card_id params[:card_id]
    render json: TaskBlueprint.render(task.board.tasks - [task] - task.children, view: :only_title)
  end
end
