/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'templates'
], function ($, _, Backbone, Bootstrap, JST) {
    'use strict';

    var HeaderView = Backbone.View.extend({
        attributes: {
            class: "navbar navbar-inverse navbar-fixed-top",
            role: "navigation"
        },

        template: JST['app/scripts/templates/header.ejs'],

        initialize: function(options) {
            this.listenTo(options.router, 'route', this.highlighItem);
        },

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },

        highlighItem: function(route, params) {
            this.$('.active').removeClass('active');
            var hash = (window.location.hash.length === 0) ? '#home' : window.location.hash;
            this.$('a[href="' + hash + '"]').parent().addClass('active');
        }

    });

    return HeaderView;
});
