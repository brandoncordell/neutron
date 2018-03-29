# This class handles the connection to an LDAP server. This is only used if
# Config.authentication_class is set to LdapAuthenticator
#
# @author Brandon Cordell <brandonc@ctsfla.com>
# @see LdapAuthenticator
# @version 1.0
class LdapService
  attr_reader :connection

  def initialize
    @connection = Net::LDAP.new

    connection.host = Config['ldap.host']
    connection.port = Config['ldap.port']
    connection.auth(Config['ldap.username'], Config['ldap.password'])
    connection.bind
  end

  # Connect to the LDAP server as an admin and search for a StaffMember
  #
  # @param windows_username [String] The windows_username of the StaffMember
  # @return [Hash] The LDAP user's information formatted for our database
  # @return [nil] if no LDAP user was found
  def find_user(windows_username)
    treebase = 'dc=cts,dc=local'
    filter = Net::LDAP::Filter.eq('samaccountname', windows_username)

    connection.search(base: treebase, filter: filter) do |result|
      return {
          email: result.mail.first,
          first_name: result.givenname.first,
          last_name: result.sn.first,
          phone_number: result.try(:telephonenumber).try(:first),
          windows_username: result.samaccountname.first
      }
    end
  end
end
