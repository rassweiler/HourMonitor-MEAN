'use strict';

// Configuring the Pays module
angular.module('pays').run(['Menus',
  function (Menus) {
    // Add the pays dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Pays',
      state: 'pays',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'pays', {
      title: 'List Pays',
      state: 'pays.list',
      roles: ['user']
    });
  }
]);
