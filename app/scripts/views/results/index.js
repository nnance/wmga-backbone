/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/results/list',
], function ($, _, Backbone, JST, ListView, ItemView) {
    'use strict';

    var ResultsIndexView = Backbone.View.extend({
        template: JST['app/scripts/templates/results/index.ejs'],

        initialize: function(options) {
            this.indexView = options.view;
        },

        render: function() {
            this.$el.html( this.template( this ) );
            this.insertView(this.indexView.render(), '#index');
            return this;
        }
    });

    return ResultsIndexView;
});
