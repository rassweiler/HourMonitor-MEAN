'use strict';

// Configuring the Articles module
angular.module('pays').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Pays', 'pays', 'item', '/pays');
    }
]);