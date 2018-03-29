# Authenticate user against our database
#
# @author Brandon Cordell <brandonc@ctsfla.com>
# @see AuthenticateUser
# @see StaffMember
# @version 1.0
class PasswordAuthenticator
  # Authenticate the user by attempting to log into the LDAP server with their credentials
  #
  # @param [StaffMember] user
  # @param [String] password
  def authenticate(user, password)
    user.authenticate(password)
  end
end
