/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/news/delete'
], function ($, _, Backbone, JST, DeleteView) {
    'use strict';

    var NewsDetailView = Backbone.View.extend({
        template: JST['app/scripts/templates/news/review.ejs'],

        events: {
            'click #delete-btn': 'showDeleteConfirm',
        },

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },

        showDeleteConfirm: function() {
            var view = new DeleteView({model: this.model});
            this.$el.append(view.render().el);
            view.show();
        }
    });

    return NewsDetailView;
});
