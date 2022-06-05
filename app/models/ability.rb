# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    can :create, BoardMessage, user: user, board: user.all_boards
    can :read, Board do |board|
      board.all_users.include? user
    end
  end
end
