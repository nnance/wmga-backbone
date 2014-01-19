/*global define*/

define([
    'jquery',
    'backbone',
    'views/home/index',
    'views/contact',
], function ($, Backbone, HomeView, ContactView) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        routes: {
            "": "showHome",
            "home": "showHome",
            "contact": "showContact"
        },

        initialize: function(options) {
            this.container = options.container;
        },

        showHome: function() {
            var view = new HomeView();
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
