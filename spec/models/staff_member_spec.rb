require 'rails_helper'

describe StaffMember do
  describe 'validations' do
    subject { create :staff_member }

    it { is_expected.to validate_presence_of :email }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
    it { is_expected.to validate_presence_of :first_name }
    it { is_expected.to validate_presence_of :last_name }
    it { is_expected.to validate_presence_of :windows_username }
    it { is_expected.to validate_uniqueness_of(:windows_username).case_insensitive }
  end

  it '#full_name displays the staff members full name' do
    gob = build_stubbed(:staff_member, first_name: 'Gob', last_name: 'Bluth')
    expect(gob.full_name).to eq 'Gob Bluth'
  end

  context 'with LDAPAuthenticator' do
    it "#fill_missing_data ensures the staff member's username is the windows_username" do
      Config.authentication_class = 'LdapAuthenticator'
      new_staff_member = StaffMember.create(first_name: 'Bob', last_name: 'Ldap', email: 'bob@woodward.com', password: 'asdf1234', windows_username: 'bobldap')
      expect(new_staff_member.username).to eq 'bobldap'
    end
  end

  context 'with PasswordAuthenticator' do
    it "#fill_missing_data ensures the staff member's username is their first initial and last name" do
      Config.authentication_class = 'PasswordAuthenticator'
      new_staff_member = StaffMember.create(first_name: 'Bob', last_name: 'Password', email: 'bob@woodward.com', password: 'asdf1234')
      expect(new_staff_member.username).to eq 'bpassword'
    end
  end
end
