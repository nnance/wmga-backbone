/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var NewsListView = Backbone.View.extend({
        template: JST['app/scripts/templates/news/list.ejs'],

        initialize: function(options) {
            this.listenTo(this.collection, 'reset', this.render);
        },

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },
    });

    return NewsListView;
});
