Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users

  root 'home#index'

  namespace :api do
    resources :workspaces
  end

  get '*path', to: 'home#index'
end
