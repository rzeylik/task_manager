class TaskHistoryBlueprint < Blueprinter::Base
  extend ActionView::Helpers::DateHelper

  identifier :id

  field :user_name do |task_history|
    task_history.user.email
  end

  field :time_ago do |task_history|
    time_ago_in_words(task_history.created_at)
  end

  fields :action

end
