class Admin::AdminController < ApplicationController
  filter_access_to :all

  before_filter :require_user

  def index
    
  end

  protected
    def permission_denied
      flash[:error] = "You do not have access to #{request.path}"

      respond_to do |format|
        format.html { redirect_to root_url }
        format.xml { head :unauthorized }
        format.js { head :unauthorized }
      end
    end
end