class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable


  has_many :workspace_rights
  has_many :workspaces, through: :workspace_rights
  has_many :board_rights
  has_many :boards, through: :board_rights

  def all_boards
    all_boards = []
    workspaces.each do |w|
      all_boards += w.boards
    end
    all_boards += boards
    all_boards.uniq
  end
end
