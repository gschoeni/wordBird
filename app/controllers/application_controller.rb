class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :init_scores
  helper_method :current_user_session, :current_user
  
  layout :choose_layout

  filter_resource_access
  private
    def init_scores
      @score = Score.all(:order => 'score DESC').first
      @scores = Score.all(:order => 'score DESC')
    end

    def choose_layout
      if @current_user
        if permitted_to? :read, :admin_admin
          'admin'
        else 
          'application'
        end
      else
        'application'
      end
    end

  protected

    def current_user_session
      return @current_user_session if defined?(@current_user_session)
      @current_user_session = UserSession.find
    end

    def current_user
      return @current_user if defined?(@current_user)
      @current_user = current_user_session && current_user_session.record
    end

    def require_user
      unless current_user
        flash[:notice] = "You must log in if you want to access that."
        redirect_to root_url
        return false
      end
    end

    def require_no_user
      if current_user
        flash[:notice] = "You must be logged out to access this."
        redirect_to root_url
        return false
      end
    end
    def permission_denied
      flash[:error] = "You do not have access to #{request.path}"

      respond_to do |format|
        format.html { redirect_to root_url }
        format.xml { head :unauthorized }
        format.js { head :unauthorized }
      end
    end

end
