/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.viewmanager',
    'routes/router',
    'routes/news',
    'routes/events',
    'collections/news',
    'collections/events',
    'views/header',
    'views/container',
    'views/footer',
], function ($, _, Backbone, BBViewManager, Router, NewsRouter, EventsRouter, NewsCollection, EventsCollection, HeaderView, ContainterView, FooterView) {
    'use strict';

    var AppView = Backbone.View.extend({
        initialize: function() {

            this.header = new HeaderView();
            this.container = new ContainterView();
            this.footer = new FooterView();

            this.news = new NewsCollection();
            this.eventsColl = new EventsCollection();

            this.router = new Router({container: this.container, news: this.news});
            this.newsRouter = new NewsRouter({container: this.container, news: this.news});
            this.eventsRouter = new EventsRouter({container: this.container, events: this.eventsColl});

        },

        render: function() {
            this.insertView(this.header.render());
            this.insertView(this.container.render());
            this.insertView(this.footer.render());
        },

        initSession: function() {
            var newsFetch = this.news.fetch();
            var eventsFetch = this.eventsColl.fetch();

            $.when(newsFetch, eventsFetch).then(function(){
                Backbone.history.start();
            });
        }
    });

    return AppView;
});
