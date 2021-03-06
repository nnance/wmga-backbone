/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/listbase',
    'moment',
    'views/news/listitem'
], function ($, _, Backbone, JST, ListBaseView, Moment, ItemView) {
    'use strict';

    var NewsListView = ListBaseView.extend({
        template: JST['app/scripts/templates/news/list.ejs'],
        addButtonTemplate: JST['app/scripts/templates/news/addbutton.ejs'],

        events: {
            'click #filter': 'switchFilter'
        },

        initialize: function(options) {
            ListBaseView.prototype.initialize.apply(this, arguments);

            var filterValues = {
                all: {
                    name: 'all',
                    start: Moment(),
                    end: Moment().subtract('years',1)
                },
                recent: {
                    name: 'recent',
                    start: Moment(),
                    end: Moment().subtract('days', 5)
                },
                past: {
                    name: 'past',
                    start: Moment().subtract('days',5),
                    end: Moment().subtract('years',2)
                }
            };
            if (options && options.filter) {
                this.filter = filterValues[options.filter];
            } else {
                this.filter = filterValues['all'];
            }
        },

        render: function() {
            ListBaseView.prototype.render.apply(this, arguments);
            this.$('#' + this.filter.name).button('toggle');
            return this;
        },

        renderItem: function(model) {
            if (model.getAsDate('itemdate').isBefore(this.filter.start) && model.getAsDate('itemdate').isAfter(this.filter.end)) {
                var view = new ItemView({model: model});
                this.insertView(view.render(),'.container');
            }
        },

        switchFilter: function(e) {
            Backbone.history.navigate('#news/filter/' + e.target.id, true);
        }
    });

    return NewsListView;
});
