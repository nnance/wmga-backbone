/*global define*/

define([
    'jquery',
    'backbone',
    'views/home/index',
    'views/events/index',
    'views/contact',
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
            this.news = options.news;
        },

        showHome: function() {
            var view = new HomeView({news: this.news});
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
