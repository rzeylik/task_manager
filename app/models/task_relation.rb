class TaskRelation < ApplicationRecord
  belongs_to :parent, class_name: 'Task', foreign_key: :parent_id
  belongs_to :child, class_name: 'Task', foreign_key: :child_id
end
