# Authenticate user's based on the authenticator class defined in config/app.yml
#
# @author Brandon Cordell <brandonc@ctsfla.com>
# @see LdapAuthenticator LdapAuthenticator - Used to authenticate users against an LDAP server
# @see PasswordAuthenticator PasswordAuthenticator - Used to authenticate users using a username/password in our database
# @version 1.0
class AuthenticateUser
  attr_reader :username, :password, :authenticator

  # Returns a new instance of AuthenticateUser
  #
  # @param [String] username Username passed in from a sign in form
  # @param [String] password Password passed in from a sign in form
  # @param [Class] authenticator Authenticator class used to authenticate the user
  def initialize(username, password, authenticator = Config.authentication_class)
    @username = username
    @password = password
    @authenticator = Object.const_get(authenticator).new
  end

  # Attempt to authenticate the user through {AuthenticateUser.authenticator}
  #
  # @return [Integer] if the user is authenticated return it's ID
  # @return [nil] if the authentication failed
  def call
    user = StaffMember.where(username: username).first
    user.id if user && authenticator.authenticate(user, password)
  end
end
