/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/alert'
], function ($, _, Backbone, JST, AlertView) {
    'use strict';

    var NewsDetailView = Backbone.View.extend({
        className: 'modal fade',

        template: JST['app/scripts/templates/news/delete.ejs'],

        events: {
            'click #delete-confirm': 'deleteConfirmed',
            'hidden.bs.modal': 'remove'
        },

        initialize: function(options) {
            this.listenTo(this.model, 'sync', this.deleteCompleted);
            this.listenTo(this.model, 'error', this.deleteFailed);
        },

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },

        show: function() {
            this.$el.modal('show');
        },

        deleteConfirmed: function() {
            this.removeSubViews();
            this.model.destroy({wait: true});
        },

        deleteCompleted: function() {
            this.$el.on('hidden.bs.modal', function() {
                Backbone.history.navigate('#news', true);
            });
            this.$el.modal('hide');
        },

        deleteFailed: function() {
            var alertView = new AlertView({errors: {response: xhr.responseText}});
            alertView.render();
            this.insertView(alertView, this.$el);
        }
    });

    return NewsDetailView;
});
