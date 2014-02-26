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

    var NewsDetailView = ReviewBaseView.extend({
        template: JST['app/scripts/templates/news/review.ejs'],
        editButtonsTemplate: JST['app/scripts/templates/news/editbuttons.ejs'],

        events: {
            'click #delete-btn': 'showDeleteConfirm',
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
