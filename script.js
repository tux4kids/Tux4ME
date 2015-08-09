document.addEventListener('WebComponentsReady', function () {
    var template = document.querySelector('template[is="dom-bind"]');
    template.page = 0; // selected is an index by default
  });