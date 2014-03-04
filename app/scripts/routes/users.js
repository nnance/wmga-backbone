/*global define*/

define([
    'routes/routerbase',
    'views/users/index',
    'views/users/list',
    'views/users/review',
    'views/users/form',
], function (BaseRouter, IndexView, ListView, ReviewView, FormView) {
    'use strict';

    var UsersRouter = BaseRouter.extend({
        routes: {
            'users': 'showList',
            'users/create': 'showAddForm',
            'users/read/:id': 'showReview',
            'users/update/:id': 'showEditForm',
            'membership': 'showMembership'
        },
        indexView: IndexView,
        listView: ListView,
        reviewView: ReviewView,
        formView: FormView,

        showMembership: function() {
            if (this.loaded) {
                if (this.session.has('userid') && this.session.get('signedIn')) {
                    this.showReview(this.session.get('userid'));
                } else {
                    Backbone.history.navigate('#home',true);
                }
            }
        }
    });

    return UsersRouter;
});
