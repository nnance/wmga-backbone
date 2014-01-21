/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/news/list',
], function ($, _, Backbone, JST, ListView, ItemView) {
    'use strict';

    var NewsIndexView = Backbone.View.extend({
        template: JST['app/scripts/templates/news/index.ejs'],

        initialize: function(options) {
            this.indexView = options.view;
        },

        render: function() {
            this.$el.html( this.template( this ) );
            this.insertView(this.indexView.render(), '#index');
            return this;
        }
    });

    return NewsIndexView;
});
