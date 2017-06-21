(function() {
    'use strict';

    angular
        .module('app.admin.events')
        .controller('EventsLoadUsersController', EventsLoadUsersController);

    /* @ngInject */
    function EventsLoadUsersController($timeout, $q, DataUser) {
        var vm = this;
        vm.searchText         = null;
        vm.querySearch        = querySearch;
        vm.simulateQuery      = false;
       
        vm.$onInit = function() {
            vm.users = [];
            DataUser.getUsers()
                .$loaded()
                .then(function(data) {
                    data.forEach(function(el) {
                        vm.users.push({
                            value: el.name.toLowerCase(),
                            display: el.name
                        });
                    });
                });
        };

        function querySearch (query) {
            var results = query ? vm.users.filter(createFilterFor(query)) : vm.users, deferred;
            if(vm.simulateQuery) {
                deferred = $q.defer();
                $timeout(function() {deferred.resolve(results);}, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }
    }
})();