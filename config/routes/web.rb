namespace :admin do
  root to: 'dashboard#index'

  get 'sign_in' => 'sessions#new'
  post 'sign_in' => 'sessions#create'
  delete 'sign_out' => 'sessions#destroy'

  resources :staff_members do
    post 'find', on: :collection
  end
end
