/*global define*/

define([
    'routes/routerbase',
    'collections/events',
    'views/events/index',
    'views/events/list',
    'views/events/review',
    'views/events/form',
], function (BaseRouter, EventColleciton, IndexView, ListView, ReviewView, FormView) {
    'use strict';

    var EventsRouter = BaseRouter.extend({
        routes: {
            'events': 'showList',
            'events/create': 'showAddForm',
            'events/read/:id': 'showReview',
            'events/update/:id': 'showEditForm',
            'events/filter/:value': 'showList'
        },
        indexView: IndexView,
        listView: ListView,
        reviewView: ReviewView,
        formView: FormView
    });

    return EventsRouter;
});
