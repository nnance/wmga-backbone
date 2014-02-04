/*global define*/

define([
    'jquery',
    'backbone',
    'views/news/index',
    'views/news/list',
    'views/news/review',
    'views/news/form',
], function ($, Backbone, IndexView, ListView, ReviewView, FormView) {
    'use strict';

    var NewsRouter = Backbone.Router.extend({
        routes: {
            'news': 'showNews',
            'news/create': 'showAddForm',
            'news/read/:id': 'showArticle',
            'news/update/:id': 'showEditForm',
            'news/filter/:value': 'showNews'
        },

        initialize: function(options) {
            this.container = options.container;
            this.newsCollection = options.newsCol;
        },

        showView: function(view) {
            var view = new IndexView({view: view});
            this.container.setView(view.render());
        },

        showNews: function(filter) {
            this.showView(new ListView({collection: this.newsCollection, filter: filter}));
        },

        showArticle: function(id) {
            this.showView(new ReviewView({model: this.newsCollection.get(id)}));
        },

        showAddForm: function() {
            this.showView(new FormView({model: new this.newsCollection.model(), collection: this.newsCollection}));
        },

        showEditForm: function(id) {
            this.showView(new FormView({model: this.newsCollection.get(id), collection: this.newsCollection}));
        },
    });

    return NewsRouter;
});
