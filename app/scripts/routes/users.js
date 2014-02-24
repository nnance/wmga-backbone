/*global define*/

define([
    'jquery',
    'backbone',
    'collections/user',
    'views/users/index',
    'views/users/list',
    'views/users/review',
    'views/users/form',
], function ($, Backbone, UserCollection, IndexView, ListView, ReviewView, FormView) {
    'use strict';

    var UsersRouter = Backbone.Router.extend({
        routes: {
            'users': 'showUsers',
            'users/create': 'showAddForm',
            'users/read/:id': 'showArticle',
            'users/update/:id': 'showEditForm',
            'users/filter/:value': 'showUsers'
        },

        initialize: function(options) {
            this.container = options.container;
            this.session = options.session;
            this.usersCollection = new UserCollection();
            this.listenTo(this, 'route', this.loadList);
        },

        loadList: function(route, params) {
            this.usersCollection.fetch();
        },

        showView: function(view) {
            if (this.session.get('signedIn')) {
                var view = new IndexView({view: view});
                this.container.setView(view.render());
            } else {
                Backbone.history.navigate('#signin',true);
            }
        },

        showUsers: function(filter) {
            this.showView(new ListView({collection: this.usersCollection, filter: filter}));
        },

        showArticle: function(id) {
            this.showView(new ReviewView({model: this.usersCollection.get(id)}));
        },

        showAddForm: function() {
            this.showView(new FormView({model: new this.usersCollection.model(), collection: this.usersCollection}));
        },

        showEditForm: function(id) {
            this.showView(new FormView({model: this.usersCollection.get(id), collection: this.usersCollection}));
        },
    });

    return UsersRouter;
});
