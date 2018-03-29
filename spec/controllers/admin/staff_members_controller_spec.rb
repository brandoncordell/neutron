# frozen_string_literal: true

require 'rails_helper'

describe Admin::StaffMembersController do
  before do
    gob = create :staff_member
    session[:user_id] = gob.id
  end

  describe '#index' do
    it 'lists all the staff members' do
      staff_members = create_list(:staff_member, 2)

      get :index
      expect(assigns(:staff_members).count).to eq 3
    end
  end

  describe '#new' do
    it 'creates an empty StaffMember' do
      get :new
      expect(assigns(:staff_member)).to be_a StaffMember
    end
  end

  describe '#create' do
    context 'with valid data' do
      it 'creates the staff member' do
        new_staff_member = {
            first_name: 'Brand',
            last_name: 'New Guy',
            email: 'brandon@newguy.com',
            windows_username: 'brandnewguy',
            password: 'asdf123'
        }

        expect {
          post :create, params: { staff_member: new_staff_member }
        }.to change{ StaffMember.count }.by 1
      end
    end

    context 'with invalid data' do
      it 're-renders :new' do
        invalid_staff_member = attributes_for(:staff_member, email: '')

        post :create, params: { staff_member: invalid_staff_member }
        expect(response).to render_template(:new)
      end
    end
  end

  describe '#update' do
    let!(:staff_member) { create :staff_member }

    context 'with valid data' do
      it 'updated the staff member' do
        patch :update, params: { id: staff_member.id, staff_member: { email: 'newemail@test.com' }}
        expect(response).to redirect_to admin_staff_members_path
      end
    end

    context 'with invalid data' do
      it 're-renders :edit' do
        post :update, params: { id: staff_member.id, staff_member: { email: '' }}
        expect(response).to render_template(:edit)
      end
    end
  end

  describe '#destroy' do
    it 'deletes the staff member' do
      old_staff_member = create(:staff_member)

      expect {
        delete :destroy, params: { id: old_staff_member.id }
      }.to change{ StaffMember.count }.by(-1)
    end
  end

  # another brittle fucking ldap test
  describe '#find' do
    context 'with a matching ldap user' do
      it 'returns a json object with the user information' do
        expected_response = {
            success: true,
            user: {
                email: 'brandon@brandoncordell.com',
                first_name: 'Brandon',
                last_name: 'LDAP_Test',
                phone_number: '(727) 687-5890',
                windows_username: 'brandonldap'
            }
        }

        get :find, params: { windows_username: 'brandonldap' }, format: :json
        expect(response.body).to eq expected_response.to_json
      end
    end

    context 'with no matching ldap user' do
      it 'returns success: false' do
        expected_response = { success: false }

        get :find, params: { windows_username: 'nobody' }, format: :json
        expect(response.body).to eq expected_response.to_json
      end
    end
  end
end
