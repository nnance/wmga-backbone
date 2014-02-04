/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'appsettings',
    'views/events/delete'
], function ($, _, Backbone, JST, AppSettings, DeleteView) {
    'use strict';

    var EventsDetailView = Backbone.View.extend({
        template: JST['app/scripts/templates/events/review.ejs'],

        events: {
            'click #delete-btn': 'showDeleteConfirm',
        },

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },

        getFileUrl: function() {
            return AppSettings.baseURL + '/attachments/' + this.model.get('attachedfile');
        },

        showDeleteConfirm: function() {
            var view = new DeleteView({model: this.model});
            this.$el.append(view.render().el);
            view.show();
        }
    });

    return EventsDetailView;
});
