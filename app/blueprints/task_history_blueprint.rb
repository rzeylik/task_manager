class TaskHistoryBlueprint < Blueprinter::Base
  extend ActionView::Helpers::DateHelper

  identifier :id

  association :user, blueprint: UserBlueprint

  field :time_ago do |task_history|
    time_ago_in_words(task_history.created_at)
  end

  field :action do |history|
    history.action.gsub('_name_', 'this card')
  end

end
