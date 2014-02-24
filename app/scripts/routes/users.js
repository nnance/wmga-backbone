/*global define*/

define([
    'routes/routerbase',
    'collections/user',
    'views/users/index',
    'views/users/list',
    'views/users/review',
    'views/users/form',
], function (BaseRouter, UserCollection, IndexView, ListView, ReviewView, FormView) {
    'use strict';

    var UsersRouter = BaseRouter.extend({
        routes: {
            'users': 'showList',
            'users/create': 'showAddForm',
            'users/read/:id': 'showReview',
            'users/update/:id': 'showEditForm',
            'users/filter/:value': 'showUsers'
        },
        collectionType: UserCollection,
        indexView: IndexView,
        listView: ListView,
        reviewView: ReviewView,
        formView: FormView
    });

    return UsersRouter;
});
