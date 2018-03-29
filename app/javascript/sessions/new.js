window.App = window.App || {};

window.App.Sessions = {
  init() {}
};

document.addEventListener('turbolinks:load', () => window.App.Sessions.init());