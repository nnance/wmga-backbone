/*global define*/

define([
    'jquery',
    'backbone',
    'views/events/index',
    'views/events/list',
    'views/events/review',
    'views/events/form',
], function ($, Backbone, IndexView, ListView, ReviewView, FormView) {
    'use strict';

    var EventsRouter = Backbone.Router.extend({
        routes: {
            'events': 'showEvents',
            'events/create': 'showAddForm',
            'events/read/:id': 'showEvent',
            'events/update/:id': 'showEditForm',
            'events/filter/:value': 'showEvents'
        },

        initialize: function(options) {
            this.container = options.container;
            this.eventsCollection = options.eventsCol;
        },

        showView: function(view) {
            var view = new IndexView({view: view});
            this.container.setView(view.render());
        },

        showEvents: function(filter) {
            this.showView(new ListView({collection: this.eventsCollection, filter: filter}));
        },

        showEvent: function(id) {
            this.showView(new ReviewView({model: this.eventsCollection.get(id)}));
        },

        showAddForm: function() {
            this.showView(new FormView({model: new this.eventsCollection.model(), collection: this.eventsCollection}));
        },

        showEditForm: function(id) {
            this.showView(new FormView({model: this.eventsCollection.get(id), collection: this.eventsCollection}));
        },
    });

    return EventsRouter;
});
