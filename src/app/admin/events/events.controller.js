(function() {
    'use strict';

    angular
        .module('app.admin.events')
        .controller('EventsController', EventsController);

    /* @ngInject */
    function EventsController($scope, $rootScope, $mdDialog, $mdToast, $filter, $element, triTheming, triLayout, uiCalendarConfig, DataEvents) {
        var vm = this;
        vm.addEvent = addEvent;
        vm.calendarOptions = {
            contentHeight: 'auto',
            selectable: true,
            editable: true,
            header: false,
            timeFormat: 'HH:mm',
            viewRender: function(view) {
                // change day
                vm.currentDay = view.calendar.getDate();
                vm.currentView = view.name;
                // update toolbar with new day for month name
                $rootScope.$broadcast('calendar-changeday', vm.currentDay);
                // update background image for month
                triLayout.layout.contentClass = 'calendar-background-image background-overlay-static overlay-gradient-10 calendar-background-month-' + vm.currentDay.month();
            },
            dayClick: function(date, jsEvent, view) { //eslint-disable-line
                vm.currentDay = date;
                addEvent(null, jsEvent);
            },
            eventClick: function(calEvent, jsEvent, view) { //eslint-disable-line
                $mdDialog.show({
                    controller: 'EventDialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/admin/events/event-dialog.tmpl.html',
                    targetEvent: jsEvent,
                    focusOnOpen: false,
                    locals: {
                        dialogData: {
                            title: 'Edit Event',
                            confirmButtonText: 'Save'
                        },
                        event: calEvent,
                        edit: true
                    }
                })
                .then(function(event) {
                    var data = returnEvent(event);
                    var toastMessage = 'Event Updated';
                    if(angular.isDefined(event.deleteMe) && event.deleteMe === true) {
                        DataEvents.deleteEvent(event.$id);
                        uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('removeEvents', event._id);
                        // change toast message
                        toastMessage = 'Event Deleted';
                    }
                    else {
                        DataEvents.editEvent(event.$id, data);
                        uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('updateEvent', event);
                    }

                    // pop a toast
                    $mdToast.show(
                        $mdToast.simple()
                        .content($filter('triTranslate')(toastMessage))
                        .position('bottom right')
                        .hideDelay(2000)
                    );
                });
            },
            eventMouseover: function(calEvent, jsEvent, view) {
                var target = angular.element(jsEvent.currentTarget);
                var tooltip = angular.element('<md-tooltip>').text(calEvent.title).addClass('tool-tip');
                target.append(tooltip);
            },
            eventMouseout: function(calEvent, jsEvent, view) {
                var target = angular.element(jsEvent.currentTarget);
                target.find('md-tooltip').remove();
            },
            eventDrop: function(event) {
                var data = returnEvent(event);
                DataEvents.editEvent(event.$id, data);
            }
        };

        vm.viewFormats = {
            'month': 'MMMM YYYY',
            'agendaWeek': 'w',
            'agendaDay': 'Do MMMM YYYY'
        };

        vm.eventSources = [{
            events: []
        }];

        function addEvent(event, $event) {
            var inAnHour = moment(vm.currentDay).add(1, 'h');
            $mdDialog.show({
                controller: 'EventDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/admin/events/event-dialog.tmpl.html',
                targetEvent: $event,
                focusOnOpen: false,
                locals: {
                    dialogData: {
                        title: 'Add Event',
                        confirmButtonText: 'Add'
                    },
                    event: {
                        start: vm.currentDay,
                        end: inAnHour,
                        palette: 'cyan',
                        stick: true
                    },
                    edit: false
                }
            })
            .then(function(event) {
                var data = returnEvent(event);
                DataEvents.addEvent(data);
                vm.eventSources[0].events.push(event);
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('triTranslate')('Event Created'))
                    .position('bottom right')
                    .hideDelay(2000)
                );
            });
        }

        function returnEvent(event) {
            console.log(event)
            //var endTime = event.end ? event.end.toObject() : 0;
            var data = {
                title: event.title,
                user: event.user,
                start: event.start.toDate().getTime(),
                end: event.end.toDate().getTime(),
                description: event.description,
                backgroundColor: event.backgroundColor,
                borderColor: event.borderColor,
                textColor: event.textColor,
                palette: event.palette
            };
                return data;
        }
      
        $scope.$on('addEvent', addEvent);

        vm.$onInit = function() {
            DataEvents.getEvents()
                .$loaded()
                .then(function(data) {
                    data.forEach(function(el) {
                        el.start = moment(el.start);
                        if(el.end < el.start) {
                            el.end = moment(el.start);
                        }
                        else {
                            el.end = moment(el.end);
                        }
                        vm.eventSources[0].events.push(el);
                    });
                    vm.load = true;
                });
        }
    }
})();
