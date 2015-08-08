'use strict';

// Configuring the Articles module
angular.module('pays').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Pays', 'pays', 'dropdown', '/pays(/create)?');
        Menus.addSubMenuItem('topbar', 'pays', 'List Pays', 'pays');
    }
]);