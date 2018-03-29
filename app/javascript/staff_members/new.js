window.App = window.App || {};

window.App.StaffMembers = {
  init() {
    $('#staff_member_windows_username').on('keyup', this.toggleLoadUserButton)
    $('[data-provides="ldap-search"]').on('click', this.ldapSearch)
  },

  ldapSearch(event) {
    $loadUserButton = $('[data-provides="ldap-search"]');

    event.preventDefault();

    $loadUserButton.html('<i class="far fa-spinner-third fa-spin"></i>');

    $.ajax({
      method: 'POST',
      url: '/admin/staff_members/find.json',
      data: {
        windows_username: $('#staff_member_windows_username').val()
      },

      success: (response) => {
        if (response.success) {
          $('#staff_member_first_name').val(response.user.first_name)
          $('#staff_member_last_name').val(response.user.last_name)
          $('#staff_member_email').val(response.user.email)
          $('#staff_member_phone_number').val(response.user.phone_number)

          $loadUserButton
            .removeClass('bg-red')
            .addClass('btn-primary')
            .text('Load User');
        } else {
          $loadUserButton
            .attr('disabled', 'disabled')
            .removeClass('btn-primary')
            .addClass('btn-danger')
            .text('User Not Found');
        }
      }
    });
  },

  toggleLoadUserButton(event) {
    const $loadUserButton = $('[data-provides="ldap-search"]'),
      $windowsUsernameField = $(event.target),
      username = $windowsUsernameField.val();

    if ($.trim(username).length) {
      $loadUserButton
        .removeClass('btn-danger')
        .addClass('btn-primary')
        .removeAttr('disabled')
        .text('Load User');
    } else {
      $loadUserButton
        .removeClass('btn-primary')
        .attr('disabled', 'disabled');
    }
  }
};

$(document).on('turbolinks:load', () => window.App.StaffMembers.init());