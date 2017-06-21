(function() {
    'use strict';

    angular
        .module('app.admin', [
            'app.admin.users',
            'app.admin.editUser',
            'app.admin.createUser',
            'app.admin.contentUser',
            'app.admin.groups',
            'app.admin.editGroup',
            'app.admin.addGroup',
            'app.admin.events'
        ]);
})();