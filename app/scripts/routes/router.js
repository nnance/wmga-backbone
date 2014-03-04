/*global define*/

define([
    'jquery',
    'backbone',
    'models/signin',
    'views/home/index',
    'views/app/signin',
    'views/events/index',
    'views/app/contact',
], function ($, Backbone, SignInModel, HomeView, SignInView, EventsView, ContactView) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        routes: {
            '': 'showHome',
            'home': 'showHome',
            'home/signup:value': 'showHome',
            'signin': 'showSignIn',
            'signout': 'signOutUser',
            'contact': 'showContact'
        },

        initialize: function(options) {
            this.container = options.container;
            this.session = options.dataManager.session;
            this.dataManager = options.dataManager;
            this.newsCollection = options.dataManager.newsCollection;
            this.eventsCollection = options.dataManager.eventsCollection;

            this.listenTo(this.session,'signedout',this.routeHome);
        },

        showHome: function(showSignUp) {
            var view = new HomeView({
                newsCol: this.newsCollection,
                eventsCol: this.eventsCollection,
                session: this.session,
                showSignUp: showSignUp
            });
            this.container.setView(view.render());
        },

        showSignIn: function() {
            var signIn = new SignInModel();
            var view = new SignInView({model: signIn, session: this.session, dataManager: this.dataManager});
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

        routeHome: function() {
            Backbone.history.navigate('#home',true);
        }
    });

    return RouterRouter;
});
