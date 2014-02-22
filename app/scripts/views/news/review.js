/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewbase',
    'appsettings',
    'views/delete'
], function ($, _, Backbone, JST, BaseView, AppSettings, DeleteView) {
    'use strict';

    var NewsDetailView = BaseView.extend({
        template: JST['app/scripts/templates/news/review.ejs'],

        events: {
            'click #delete-btn': 'showDeleteConfirm',
        },

        getFileUrl: function() {
            return AppSettings.getBaseURL() + '/attachments/' + this.model.get('attachedfile');
        },

        showDeleteConfirm: function() {
            var view = new DeleteView({
                model: this.model,
                modelAttr: 'title',
                modelTypeName: 'news article',
                successRoute: '#news'
            });
            this.$el.append(view.render().el);
            view.show();
        }
    });

    return NewsDetailView;
});
