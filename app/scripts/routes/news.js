/*global define*/

define([
    'jquery',
    'backbone',
    'models/news',
    'views/news/index',
    'views/news/list',
    'views/news/detail',
    'views/news/form',
], function ($, Backbone, NewsModel, IndexView, ListView, DetailView, FormView) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({
        routes: {
            'news': 'showNews',
            'news/create': 'showAddForm',
            'news/read/:id': 'showArticle',
            'news/update/:id': 'showEditForm',
        },

        initialize: function(options) {
            this.container = options.container;
            this.news = options.news;
        },

        showView: function(view) {
            var view = new IndexView({view: view});
            this.container.setView(view.render());
        },

        showNews: function() {
            this.showView(new ListView({collection: this.news}));
        },

        showArticle: function(id) {
            this.showView(new DetailView({model: this.news.get(id)}));
        },

        showAddForm: function() {
            this.showView(new FormView({model: new NewsModel(), collection: this.news}));
        },

        showEditForm: function(id) {
            this.showView(new FormView({model: this.news.get(id)}));
        },
    });

    return RouterRouter;
});
