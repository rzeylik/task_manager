class Workspace < ApplicationRecord
  has_many :workspace_rights
  has_many :users, through: :workspace_rights
  has_many :boards
end
