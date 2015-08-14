'use strict';

// Configuring the Articles module
angular.module('jobs').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Jobs', 'jobs', 'dropdown', '/jobs(/create)?');
        Menus.addSubMenuItem('topbar', 'jobs', 'Select Job', 'jobs');
        Menus.addSubMenuItem('topbar', 'jobs', 'Create Job', 'jobs/create');
    }
]);