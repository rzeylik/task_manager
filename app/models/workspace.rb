class Workspace < ApplicationRecord
  has_many :workspace_rights
  has_many :users, through: :workspace_rights
  belongs_to :owner, foreign_key: :user_id, class_name: 'User'
  has_many :boards
end
