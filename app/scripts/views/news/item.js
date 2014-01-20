/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var NewsItemView = Backbone.View.extend({
        tagName: 'tr',

        template: JST['app/scripts/templates/news/item.ejs'],

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },
    });

    return NewsItemView;
});
