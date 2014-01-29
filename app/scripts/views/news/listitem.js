/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var NewsListitemView = Backbone.View.extend({
        template: JST['app/scripts/templates/news/listitem.ejs'],

        initialize: function(options) {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },
    });

    return NewsListitemView;
});
