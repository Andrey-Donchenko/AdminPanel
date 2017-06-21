(function() {
    'use strict';

    angular
        .module('app.admin.events')
        .config(moduleConfig);

    var required = {
        required: ["Auth", function(Auth) {
            return Auth.$requireSignIn();
        }]
    };
    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.events', {
            // set the url of this page
            url: '/events',
            views: {
                '@triangular': {
                    // set the html template to show on this page
                    templateUrl: 'app/admin/events/events.tmpl.html',
                    // set the controller to load for this page
                    controller: 'EventsController',
                    controllerAs: 'vm'
                },
                'toolbar@triangular': {
                    templateUrl: 'app/admin/events/layouts/toolbar/toolbar.tmpl.html',
                    controller: 'EventsToolbarController',
                    controllerAs: 'vm'
                },
                'belowContent@triangular': {
                    templateUrl: 'app/admin/events/events-fabs.tmpl.html',
                    controller: 'EventsFabController',
                    controllerAs: 'vm'
                }
            },
            data: {
                layout: {
                    contentClass: 'triangular-non-scrolling layout-column',
                    footer: false
                }
            },
            resolve: required
        });

        triMenuProvider.addMenu({
            name: 'Events',
            state: 'triangular.events',
            type: 'link',
            icon: 'zmdi zmdi-calendar-alt',
        });
    }
})();
