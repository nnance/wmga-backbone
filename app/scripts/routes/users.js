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
            'membership': 'showMembership'
        },
        collectionType: UserCollection,
        indexView: IndexView,
        listView: ListView,
        reviewView: ReviewView,
        formView: FormView,

        initialize: function() {
            BaseRouter.prototype.initialize.apply(this,arguments);
            this.listenTo(this.session,'change:signedIn',this.refreshUsers);
        },

        refreshUsers: function() {
            this.loaded = false;
            if (this.session.get('signedIn')) {
                this.loadList();
            } else {
                this.collection.reset();
            }
        },

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
