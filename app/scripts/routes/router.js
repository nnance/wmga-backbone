/*global define*/

define([
    'jquery',
    'backbone',
    'views/home/index',
    'views/events/index',
    'views/app/contact',
], function ($, Backbone, HomeView, EventsView, ContactView) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        routes: {
            '': 'showHome',
            'home': 'showHome',
            'contact': 'showContact'
        },

        initialize: function(options) {
            this.container = options.container;
            this.newsCollection = options.newsCol;
            this.eventsCollection = options.eventsCol;
        },

        showHome: function() {
            var view = new HomeView({newsCol: this.newsCollection, eventsCol: this.eventsCollection});
            this.container.setView(view.render());
        },

        showContact: function() {
            var view = new ContactView();
            this.container.setView(view.render());
            view.postRender();
        }
    });

    return RouterRouter;
});
