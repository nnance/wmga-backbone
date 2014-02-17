/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewbase',
    'views/alert'
], function ($, _, Backbone, JST, BaseView, AlertView) {
    'use strict';

    var EventsDeleteView = BaseView.extend({
        className: 'modal fade',

        template: JST['app/scripts/templates/events/delete.ejs'],

        events: {
            'click #delete-confirm': 'deleteConfirmed',
            'hidden.bs.modal': 'remove'
        },

        initialize: function(options) {
            this.listenTo(this.model, 'sync', this.deleteCompleted);
            this.listenTo(this.model, 'error', this.deleteFailed);
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
                Backbone.history.navigate('#events', true);
            });
            this.$el.modal('hide');
        },

        deleteFailed: function() {
            var alertView = new AlertView({errors: {response: xhr.responseText}});
            alertView.render();
            this.insertView(alertView, this.$el);
        }
    });

    return EventsDeleteView;
});
