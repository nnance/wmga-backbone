/*global define*/

define([
    'jquery',
    'backbone',
    'collections/news',
    'collections/events',
    'models/signin',
    'views/home/index',
    'views/app/signin',
    'views/events/index',
    'views/app/contact',
], function ($, Backbone, NewsCollection, EventsCollection, SignInModel, HomeView, SignInView, EventsView, ContactView) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        routes: {
            '': 'showHome',
            'home': 'showHome',
            'signin': 'showSignIn',
            'signout': 'signOutUser',
            'contact': 'showContact'
        },

        initialize: function(options) {
            this.container = options.container;
            this.session = options.session;
            this.newsCollection = new NewsCollection();
            this.eventsCollection = new EventsCollection();

            this.listenToOnce(this, 'route', this.LoadData);
            this.listenTo(this.session,'change:signedIn',this.checkRoute);
        },

        LoadData: function() {
            this.newsCollection.fetch();
            this.eventsCollection.fetch();
        },

        showHome: function() {
            var view = new HomeView({
                newsCol: this.newsCollection,
                eventsCol: this.eventsCollection,
                session: this.session
            });
            this.container.setView(view.render());
        },

        showSignIn: function() {
            var signIn = new SignInModel();
            var view = new SignInView({model: signIn, session: this.session});
            this.container.setView(view.render());
        },

        signOutUser: function() {
            this.session.signout();
        },

        showContact: function() {
            var view = new ContactView();
            this.container.setView(view.render());
            view.postRender();
        },

        checkRoute: function() {
            if (!this.session.get('signedIn')) {
                Backbone.history.navigate('#home',true);
            }
        }
    });

    return RouterRouter;
});
