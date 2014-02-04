/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.viewmanager',
    'routes/router',
    'routes/news',
    'routes/events',
    'routes/results',
    'collections/news',
    'collections/events',
    'collections/results',
    'views/header',
    'views/container',
    'views/footer',
], function ($, _, Backbone, BBViewManager, Router, NewsRouter, EventsRouter, ResultsRouter, NewsCollection, EventsCollection, ResultsCollection, HeaderView, ContainterView, FooterView) {
    'use strict';

    var AppView = Backbone.View.extend({
        initialize: function() {

            this.header = new HeaderView();
            this.container = new ContainterView();
            this.footer = new FooterView();

            this.newsCollection = new NewsCollection();
            this.eventsCollection = new EventsCollection();
            this.resultsCollection = new ResultsCollection();

            this.router = new Router({container: this.container, newsCol: this.newsCollection, eventsCol: this.eventsCollection});
            this.newsRouter = new NewsRouter({container: this.container, newsCol: this.newsCollection});
            this.eventsRouter = new EventsRouter({container: this.container, eventsCol: this.eventsCollection});
            this.resultsRouter = new ResultsRouter({container: this.container, resultsCol: this.resultsCollection});

        },

        render: function() {
            this.insertView(this.header.render());
            this.insertView(this.container.render());
            this.insertView(this.footer.render());
        },

        initSession: function() {
            var newsFetch = this.newsCollection.fetch();
            var eventsFetch = this.eventsCollection.fetch();
            var resultsFetch = this.resultsCollection.fetch();

            $.when(newsFetch, eventsFetch, resultsFetch).then(function(){
                Backbone.history.start();
            });
        }
    });

    return AppView;
});
