/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/reviewbase',
    'appsettings',
    'views/delete'
], function ($, _, Backbone, JST, ReviewBaseView, AppSettings, DeleteView) {
    'use strict';

    var EventsDetailView = ReviewBaseView.extend({
        template: JST['app/scripts/templates/events/review.ejs'],
        editButtonsTemplate: JST['app/scripts/templates/events/editbuttons.ejs'],

        events: {
            'click #delete-btn': 'showDeleteConfirm',
        },

        getFileUrl: function() {
            return AppSettings.getBaseURL() + '/files/' + this.model.get('attachedfile');
        },

        showDeleteConfirm: function() {
            var view = new DeleteView({
                model: this.model,
                modelAttr: 'title',
                modelTypeName: 'event',
                successRoute: '#events'
            });
            this.$el.append(view.render().el);
            view.show();
        }
    });

    return EventsDetailView;
});
