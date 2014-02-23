/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'templates',
    'views/viewbase'
], function ($, _, Backbone, Bootstrap, JST, BaseView) {
    'use strict';

    var HeaderView = BaseView.extend({
        attributes: {
            class: "navbar navbar-inverse navbar-fixed-top",
            role: "navigation"
        },

        template: JST['app/scripts/templates/app/header.ejs'],

        initialize: function(options) {
            this.listenTo(Backbone.history, 'route', this.highlighItem);
        },

        highlighItem: function(router, route, params) {
            this.$('.active').removeClass('active');

            var hash = (window.location.hash.length === 0) ? '#home' : window.location.hash;
            if (hash.indexOf('/') > 0)
                hash = hash.split('/')[0];

            var item = this.$('a[href="' + hash + '"]');
            if (item.parent().parent().hasClass('dropdown-menu'))
                item = item.parent().parent();
            item.parent().addClass('active');
        }

    });

    return HeaderView;
});
