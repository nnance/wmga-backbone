/*global define*/

define([
    'jquery',
    'backbone',
    'models/events',
    'views/events/index',
    'views/events/list',
    'views/events/review',
    'views/events/form',
], function ($, Backbone, EventsModel, IndexView, ListView, ReviewView, FormView) {
    'use strict';

    var EventsRouter = Backbone.Router.extend({
        routes: {
            'events': 'showEvents',
            'events/create': 'showAddForm',
            'events/read/:id': 'showEvent',
            'events/update/:id': 'showEditForm',
        },

        initialize: function(options) {
            this.container = options.container;
            this.events = options.events;
        },

        showView: function(view) {
            var view = new IndexView({view: view});
            this.container.setView(view.render());
        },

        showEvents: function() {
            this.showView(new ListView({collection: this.events}));
        },

        showEvent: function(id) {
            this.showView(new ReviewView({model: this.events.get(id)}));
        },

        showAddForm: function() {
            this.showView(new FormView({model: new EventsModel(), collection: this.events}));
        },

        showEditForm: function(id) {
            this.showView(new FormView({model: this.events.get(id)}));
        },
    });

    return EventsRouter;
});
