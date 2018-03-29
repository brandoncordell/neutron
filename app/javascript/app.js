const dt = require('datatables.net'),
  Inputmask = require('inputmask');

window.App = {
  init() {
    this.initDataTables();
    this.initInputmask();
  },

  highlightActivePage() {
    $('.sidebar .sidebar-link').each((index, link) => {
      const $link = $(link),
        controller = $link.data('controller');

      if (window.location.pathname.includes(controller)) {
        $link.parent().addClass('active');
      }
    });
  },

  initDataTables() {
    const $dataTable = $('[data-provides="datatable"]');
    let columnDefs = [];

    if ($dataTable.data('datatable-has-actions')) {
      columnDefs.push({
        targets: -1,
        orderable: false,
        searchable: false
      });
    }

    console.log(columnDefs);

    $dataTable.DataTable({
      columnDefs: columnDefs,
      dom: '<"my-10"<"flex justify-between mb-3"lf>t<"flex justify-between mt-4"ip>>'
    });
  },

  initInputmask() {
    Inputmask().mask(document.querySelectorAll("input"));
  }
};

document.addEventListener('turbolinks:load', () => window.App.init());
document.addEventListener('turbolinks:load', () => window.App.highlightActivePage());
