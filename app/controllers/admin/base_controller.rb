module Admin
  class BaseController < ::ApplicationController
    helper_method :authenticate_user!, :current_user, :logged_in?

    layout 'admin'

    protected

    def authenticate_user!
      redirect_to admin_sign_in_path unless logged_in?
    end

    def current_user
      @current_user ||= StaffMember.find(session[:user_id]) if session[:user_id]
    end

    def logged_in?
      !!current_user
    end
  end
end
