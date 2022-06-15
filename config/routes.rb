Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users

  root 'home#index'

  namespace :api do
    resources :workspaces do
      member do
        post 'add_board'
        post 'add_user'
        post 'remove_user'
      end
    end
    resources :boards do
      resources :messages, controller: 'board_messages'
      member do
        get 'settings'
        post 'add_image'
        post 'add_user'
        post 'remove_user'
        get 'permissions'
      end
    end
    resources :lists do
      collection do
        post 'change_position'
      end
    end
    resources :tasks do
      member do
        post 'join'
        post 'leave'
        post 'assign_user'
        post 'unassign_user'
        post 'attach_file'
        post 'remove_file'
        get 'users'
        get 'users_to_assign'
      end
      collection do
        post 'change_position'
      end
    end

    resources :task_relations do
      collection do
        post 'add_relation'
        post 'remove_relation'
        post 'cards_options'
      end
    end

    resources :board_rights, only: [:update]
  end

  get '*path', to: 'home#index'
end
