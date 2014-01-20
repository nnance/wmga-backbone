/*global define*/

define([
    'jquery',
    'backbone',
    'views/home/index',
    'views/events/index',
    'views/news/index',
    'views/contact',
], function ($, Backbone, HomeView, EventsView, NewsView, ContactView) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        routes: {
            '': 'showHome',
            'home': 'showHome',
            'events': 'showEvents',
            'news': 'showNews',
            'contact': 'showContact'
        },

        initialize: function(options) {
            this.container = options.container;
        },

        showHome: function() {
            var view = new HomeView();
            this.container.setView(view.render());
        },

        showEvents: function() {
            var view = new EventsView();
            this.container.setView(view.render());
        },

        showNews: function() {
            var view = new NewsView();
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
