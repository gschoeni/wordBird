authorization do
  
  role :guest do
    has_permission_on :play, :to => :read
    has_permission_on :scores, :to => [:read, :create]
    has_permission_on :user_sessions, :to => :manage
    has_permission_on :users, :to => :create
  end


  role :member do
    includes :guest
    has_permission_on :scores, :to => [:read, :create, :my_scores]
    has_permission_on :users, :to => :read
    has_permission_on :users, :to => [:create, :update] do
      if_attribute :id => is { user.id }
    end
  end

  role :admin do
    includes :member
    has_permission_on :admin_admin, :to => :manage
    has_permission_on :admin_users, :to => :manage
    has_permission_on :admin_roles, :to => :manage
    has_permission_on :admin_scores, :to => :manage
    has_permission_on :admin_achievements, :to => :manage
    has_permission_on :admin_achievement_categories, :to => :manage
  end

end

privileges do
  privilege :manage, :includes => [:create, :read, :update, :delete]
  privilege :read, :includes => [:index, :show]
  privilege :create, :includes => :new
  privilege :update, :includes => [:edit]
  privilege :delete, :includes => :destroy
end 
