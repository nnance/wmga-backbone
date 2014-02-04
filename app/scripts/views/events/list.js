/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'moment',
    'views/events/listitem'
], function ($, _, Backbone, JST, Moment, ItemView) {
    'use strict';

    var EventsListView = Backbone.View.extend({
        template: JST['app/scripts/templates/events/list.ejs'],

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
                upcoming: {
                    name: 'upcoming',
                    start: Moment().add('days', 5),
                    end: Moment()
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
                if (model.getAsDate('startdate') < this.filter.start && model.getAsDate('startdate') > this.filter.end)
                    this.addRow(model);
            }, this);
        },

        addRow: function(model) {
            var view = new ItemView({model: model});
            this.insertView(view.render(),'.container');
        },

        switchFilter: function() {
            Backbone.history.navigate('#events/filter/' + event.target.id, true);
        }

    });

    return EventsListView;
});
