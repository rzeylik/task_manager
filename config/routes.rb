Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users

  root 'home#index'

  namespace :api do
    resources :workspaces
    resources :boards
    resources :lists do
      collection do
        post 'change_position'
      end
    end
    resources :tasks do
      collection do
        post 'change_position'
      end
    end
  end

  get '*path', to: 'home#index'
end
