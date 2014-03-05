/*global define*/

define([
    'routes/routerbase',
    'models/email',
    'views/users/index',
    'views/users/list',
    'views/users/review',
    'views/users/form',
    'views/users/email',
], function (BaseRouter, EmailModel, IndexView, ListView, ReviewView, FormView, EmailView) {
    'use strict';

    var UsersRouter = BaseRouter.extend({
        routes: {
            'users': 'showList',
            'users/create': 'showAddForm',
            'users/read/:id': 'showReview',
            'users/update/:id': 'showEditForm',
            'membership': 'showMembership',
            'users/email': 'showEmailForm'
        },
        indexView: IndexView,
        listView: ListView,
        reviewView: ReviewView,
        formView: FormView,

        showMembership: function() {
            if (this.session.has('userid') && this.session.get('signedin')) {
                this.showReview(this.session.get('userid'));
            } else {
                Backbone.history.navigate('#home',true);
            }
        },

        showEmailForm: function() {
            var view = new EmailView({
                model: new EmailModel(),
                session: this.session,
                dataManager: this.dataManager
            })
            this.showView(view);
        },
    });

    return UsersRouter;
});
