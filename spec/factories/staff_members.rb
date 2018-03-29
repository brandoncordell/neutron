# frozen_string_literal: true

FactoryBot.define do
  factory :staff_member do
    sequence(:first_name) {|n| "first#{n}" }
    sequence(:last_name) {|n| "last#{n}" }
    sequence(:username) {|n| "user#{n}" }
    sequence(:windows_username) {|n| "user#{n}" }
    sequence(:email) {|n| "user#{n}@bluth.co" }
    phone_number '(352) 666-0333'
    password_digest BCrypt::Password.create('magic')
  end

  factory :ldap_staff_member, class: StaffMember do
    first_name 'Brandon'
    last_name 'LDAP_Test'
    username 'brandonldap'
    windows_username 'brandonc'
    email 'brandon@brandoncordell.com'
    phone_number '(727) 687-5890'
    password_digest BCrypt::Password.create('brandonc')
  end
end
