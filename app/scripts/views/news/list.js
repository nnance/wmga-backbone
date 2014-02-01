/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'moment',
    'views/news/listitem'
], function ($, _, Backbone, JST, Moment, ItemView) {
    'use strict';

    var NewsListView = Backbone.View.extend({
        template: JST['app/scripts/templates/news/list.ejs'],

        events: {
            'click #filter': 'switchFilter'
        },

        initialize: function(options) {
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

            this.listenTo(this.collection, 'reset,sort', this.renderList);
            this.listenTo(this.collection, 'add', this.addRow);
        },

        render: function() {
            this.$el.html( this.template( this ) );
            this.renderList();
            this.$('#' + this.filter.name).button('toggle');
            return this;
        },

        renderList: function() {
            this.removeSubViews();
            this.collection.forEach(function(model) {
                if (model.getAsDate('itemdate') < this.filter.start && model.getAsDate('itemdate') > this.filter.end)
                    this.addRow(model);
            }, this);
        },

        addRow: function(model) {
            if (Moment(model.get('itemdate')) < this.filter.start) {
                var view = new ItemView({model: model});
                this.insertView(view.render(),'.container');
            }
        },

        switchFilter: function() {
            Backbone.history.navigate('#news/filter/' + event.target.id, true);
        }
    });

    return NewsListView;
});
