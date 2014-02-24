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
            'signin': 'showSignIn',
            'signout': 'signOutUser',
            'contact': 'showContact'
        },

        initialize: function(options) {
            this.container = options.container;
            this.session = options.session;
            this.newsCollection = options.newsCol;
            this.eventsCollection = options.eventsCol;

            this.listenTo(this.session,'change:signedIn',this.checkRoute);
        },

        showHome: function() {
            var view = new HomeView({newsCol: this.newsCollection, eventsCol: this.eventsCollection});
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
