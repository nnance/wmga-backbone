/*global define*/

define([
    'jquery',
    'backbone',
    'views/results/index',
    'views/results/list',
    'views/results/review',
    'views/results/form',
], function ($, Backbone, IndexView, ListView, ReviewView, FormView) {
    'use strict';

    var ResultsRouter = Backbone.Router.extend({
        routes: {
            'results': 'showResults',
            'results/create': 'showAddForm',
            'results/read/:id': 'showArticle',
            'results/update/:id': 'showEditForm',
            'results/filter/:value': 'showResults'
        },

        initialize: function(options) {
            this.container = options.container;
            this.resultsCollection = options.resultsCol;
        },

        showView: function(view) {
            var view = new IndexView({view: view});
            this.container.setView(view.render());
        },

        showResults: function(filter) {
            this.showView(new ListView({collection: this.resultsCollection, filter: filter}));
        },

        showArticle: function(id) {
            this.showView(new ReviewView({model: this.resultsCollection.get(id)}));
        },

        showAddForm: function() {
            this.showView(new FormView({model: new this.resultsCollection.model(), collection: this.resultsCollection}));
        },

        showEditForm: function(id) {
            this.showView(new FormView({model: this.resultsCollection.get(id), collection: this.resultsCollection}));
        },
    });

    return ResultsRouter;
});
