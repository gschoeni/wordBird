class UsersController < ApplicationController

  def new  
      @user = User.new  
  end  
    
  def show
    @achievements = Achievement.all(:order => 'achievement_category_id')
  end

  def create  
    @user = User.new(params[:user])  
    if @user.save  
      flash[:notice] = "Registration successful."  
      redirect_to root_url  
    else  
      render :action => 'new'  
    end  
  end  

  def edit  
    @user = current_user  
  end  
    
  def update  
    @user = current_user  
    if @user.update_attributes(params[:user])  
      #flash[:notice] = "Successfully updated profile."  
      redirect_to user_path(current_user)  
    else  
      render :action => 'edit'  
    end  
  end 
end
