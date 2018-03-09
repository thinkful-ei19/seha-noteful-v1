/* global $ noteful api store */
'use strict';

$(document).ready(function () {
  noteful.bindEventListeners();
  noteful.newSearchTerm({});
});
// api.search({})
//   .then (response => {
//     store.notes = response;
//     noteful.render();
//   });
