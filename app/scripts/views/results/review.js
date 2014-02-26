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

    var ResultsDetailView = ReviewBaseView.extend({
        template: JST['app/scripts/templates/results/review.ejs'],
        editButtonsTemplate: JST['app/scripts/templates/results/editbuttons.ejs'],

        events: {
            'click #delete-btn': 'showDeleteConfirm',
        },

        showDeleteConfirm: function() {
            var view = new DeleteView({
                model: this.model,
                modelAttr: 'title',
                modelTypeName: 'tournament results',
                successRoute: '#results'
            });
            this.$el.append(view.render().el);
            view.show();
        }
    });

    return ResultsDetailView;
});
