# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    can :manage, Workspace, user_id: user.id

    can :manage, Board do |board|
      board.workspace.users.include? user
    end
    can [:read, :add_image], Board do |board|
      board.all_users.include? user
    end

    can :manage, List do |list|
      list.board.workspace.users.include? user
    end
    can :read, List do |list|
      list.board.all_users.include? user
    end
    can :move, List do |list|
      rights = BoardRight.find_by(board: list.board, user: user)
      rights&.can_move_lists
    end
    can [:create, :update, :destroy], List do |list|
      rights = BoardRight.find_by(board: list.board, user: user)
      rights&.can_edit_lists
    end

    can :manage, Task do |task|
      task.board.workspace.users.include? user
    end
    can :read, Task do |task|
      task.board.all_users.include? user
    end
    can :move, Task do |task|
      rights = BoardRight.find_by(board: task.board, user: user)
      rights&.can_move_tasks
    end
    can [:create, :update, :destroy], Task do |task|
      rights = BoardRight.find_by(board: task.board, user: user)
      rights&.can_edit_tasks
    end

    can :create, BoardMessage, user: user, board: user.all_boards
    can :read, BoardMessage, board: user.all_boards


  end
end
