# frozen_string_literal: true

module Admin
  class SessionsController < BaseController
    layout 'sessions'

    def new; end

    def create
      result = AuthenticateUser.new(params[:username], params[:password]).call

      respond_to do |format|
        if result
          format.any(:html, :js) do
            session[:user_id] = result
            redirect_to admin_root_path
          end
        else
          format.html do
            flash[:notice] = 'Your username or password is incorrect.'
            render :new
          end

          format.js { @error = 'Your username or password is incorrect.' }
        end
      end
    end

    def destroy
      session.delete(:user_id)
      redirect_to admin_sign_in_path
    end
  end
end
