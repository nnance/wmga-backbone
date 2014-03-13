/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/listbase',
    'moment',
    'views/events/listitem'
], function ($, _, Backbone, JST, ListBaseView, Moment, ItemView) {
    'use strict';

    var EventsListView = ListBaseView.extend({
        template: JST['app/scripts/templates/events/list.ejs'],
        addButtonTemplate: JST['app/scripts/templates/events/addbutton.ejs'],

        events: {
            'click #filter': 'switchFilter'
        },

        initialize: function(options) {
            ListBaseView.prototype.initialize.apply(this,arguments);

            var filterValues = {
                all: {
                    name: 'all',
                    start: Moment().add('years',1),
                    end: Moment().subtract('years',1)
                },
                upcoming: {
                    name: 'upcoming',
                    start: Moment().add('days', 15),
                    end: Moment()
                },
                past: {
                    name: 'past',
                    start: Moment().subtract('days',1),
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
            if (model.getAsDate('startdate').isBefore(this.filter.start) && model.getAsDate('startdate').isAfter(this.filter.end)) {
                var view = new ItemView({model: model});
                this.insertView(view.render(),'.container');
            }
        },

        switchFilter: function(e) {
            Backbone.history.navigate('#events/filter/' + e.target.id, true);
        }

    });

    return EventsListView;
});
