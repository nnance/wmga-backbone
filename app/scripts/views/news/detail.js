/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var NewsDetailView = Backbone.View.extend({
        template: JST['app/scripts/templates/news/detail.ejs'],

        events: {
            'click #delete-btn': 'showDeleteConfirm',
            'click #delete-confirm': 'deleteConfirmed'
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },

        showDeleteConfirm: function() {
            this.$('.modal').modal('show');
        },

        deleteConfirmed: function() {
            // TODO: implemenet delete
            this.$('.modal').modal('hide');
            Backbone.history.navigate('#news', true);
        }
    });

    return NewsDetailView;
});
