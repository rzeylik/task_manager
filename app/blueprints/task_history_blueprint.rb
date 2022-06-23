class TaskHistoryBlueprint < Blueprinter::Base
  extend ActionView::Helpers::DateHelper

  identifier :id

  fields :board_id

  association :user, blueprint: UserBlueprint

  field :time_ago do |task_history|
    time_ago_in_words(task_history.created_at)
  end

  field :action do |history|
    history.action.gsub('_name_', 'this card')
  end

  view :activity do
    field :action do |history|
      history.action.gsub('_name_', history.name)
    end
    field :created_at do |history|
      history.created_at.in_time_zone('Kyiv').strftime("%b %d %H:%M")
    end
  end
end
