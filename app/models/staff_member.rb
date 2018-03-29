# frozen_string_literal: true

# Model for staff_members
#
# @author Brandon Cordell <brandonc@ctsfla.com>
# @version 1.0
class StaffMember < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :windows_username, presence: true, uniqueness: { case_sensitive: false }

  before_validation :fill_missing_data

  def full_name
    "#{first_name} #{last_name}"
  end

  private

  def fill_missing_data
    self.password = windows_username if Config.authentication_class == 'LdapAuthenticator'
    set_username
  end

  def set_username
    self.username = if Config.authentication_class == 'LdapAuthenticator'
                      windows_username
                    else
                      "#{first_name[0]}#{last_name}".downcase unless first_name.nil?
                    end
  end
end
