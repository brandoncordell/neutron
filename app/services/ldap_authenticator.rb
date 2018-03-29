# Authenticate user against the LDAP server configured in config/app.yml
#
# @author Brandon Cordell <brandonc@ctsfla.com>
# @see AuthenticateUser
# @see StaffMember
# @version 1.0
class LdapAuthenticator
  attr_reader :connection

  def initialize
    @connection = Net::LDAP.new
    connection.host = Config['ldap.host']
    connection.port = Config['ldap.port']

    connection.auth(Config['ldap.username'], Config['ldap.password'])
  end

  # Authenticate the user by attempting to log into the LDAP server with their credentials
  #
  # @param [StaffMember] user
  # @param [String] password
  def authenticate(user, password)
    connection.bind_as(
      base: 'dc=cts,dc=local',
      filter: "(samaccountname=#{user.windows_username})",
      password: password
    )
  end
end
