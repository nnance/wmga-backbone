/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var NewsIndexView = Backbone.View.extend({
        template: JST['app/scripts/templates/news/index.ejs'],

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },
    });

    return NewsIndexView;
});
