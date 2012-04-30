Scoreboard::Application.routes.draw do

  match "my_scores" => "scores#my_scores"

  get "user_sessions/new"


  resources :user_sessions, :only => [:new, :create, :destroy]
  resources :scores
  resources :users, :only => [:new, :create, :update, :edit, :show]

  match "login" => "user_sessions#new"
  match "logout" => "user_sessions#destroy"

  namespace :admin do
    resources :scores
    resources :users
    resources :roles
    resources :achievements
    resources :achievement_categories
    root :to => 'admin#index'
  end
 
  root :to => 'play#index'

end
