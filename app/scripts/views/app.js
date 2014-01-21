/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.viewmanager',
    'routes/router',
    'routes/news',
    'collections/news',
    'views/header',
    'views/container',
    'views/footer',
], function ($, _, Backbone, BBViewManager, Router, NewsRouter, NewsCollection, HeaderView, ContainterView, FooterView) {
    'use strict';

    var AppView = Backbone.View.extend({
        initialize: function() {

            this.header = new HeaderView();
            this.container = new ContainterView();
            this.footer = new FooterView();

            this.news = new NewsCollection();

            this.router = new Router({container: this.container, news: this.news});
            this.newsRouter = new NewsRouter({container: this.container, news: this.news});

        },

        render: function() {
            this.insertView(this.header.render());
            this.insertView(this.container.render());
            this.insertView(this.footer.render());
        }
    });

    return AppView;
});
