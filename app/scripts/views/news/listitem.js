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
            this.listenTo(this.model, 'reset', this.render);
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },
    });

    return NewsListitemView;
});
