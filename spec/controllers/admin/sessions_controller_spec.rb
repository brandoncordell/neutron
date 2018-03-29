# frozen_string_literal: true

require 'rails_helper'

describe Admin::SessionsController do
  describe '#create' do
    context 'without a valid account' do
      it 're-renders the sign in form' do
        post :create, params: { username: 'nobody', password: 'doesnotmatter' }
        expect(flash[:notice]).to eq 'Your username or password is incorrect.'
      end
    end

    context 'using PasswordAuthenticator' do
      before do
        Config.authentication_class = 'PasswordAuthenticator'
      end

      it 'redirects to the dashboard on login' do
        gob = create(:staff_member)

        post :create, params: { username: gob[:username], password: 'magic' }
        expect(response).to redirect_to admin_root_path
      end
    end

    context 'using LdapAuthenticator' do
      before do
        Config.authentication_class = 'LdapAuthenticator'
      end

      it 'redirects to the dashboard on login' do
        brandon = create(:ldap_staff_member)

        post :create, params: { username: brandon[:username], password: 'asdf1234' }
        expect(response).to redirect_to admin_root_path
      end
    end
  end

  describe '#destroy' do
    it 'redirects back to the sign in form' do
      delete :destroy
      expect(response).to redirect_to admin_sign_in_path
    end

    it 'deletes the user id from the session' do
      delete :destroy, session: { user_id: 1 }
      expect(session[:user_id]).to be_nil
    end
  end
end
