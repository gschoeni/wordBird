class Admin::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def new  
    @user = User.new  
  end 

  def show
     @user = User.find(params[:id])
  end 
    
  def create  
    @user = User.new(params[:user])  
    if @user.save  
      flash[:notice] = "New user successfully created"  
      redirect_to admin_users_url  
    else  
      render :action => 'new'  
    end  
  end  

  def edit  
    @user = User.find(params[:id]) 
  end  
    
  def update  
    @user = User.find(params[:id])  
    if @user.update_attributes(params[:user])  
      flash[:notice] = "Successfully updated user."  
      redirect_to admin_users_url  
    else  
      render :action => 'edit'  
    end  
  end 

  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to admin_users_url }
      format.json { head :ok }
    end
  end
end
