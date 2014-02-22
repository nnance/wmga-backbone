/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/viewbase',
    'routes/router',
    'routes/news',
    'routes/events',
    'routes/results',
    'routes/users',
    'collections/news',
    'collections/events',
    'collections/results',
    'collections/session',
    'views/app/header',
    'views/app/footer',
], function ($, _, Backbone, BaseView, Router, NewsRouter, EventsRouter, ResultsRouter, UserRouter, NewsCollection, EventsCollection, ResultsCollection, SessionCollection, HeaderView, FooterView) {
    'use strict';

    var AppView = BaseView.extend({
        initialize: function() {

            this.header = new HeaderView();
            this.container = new BaseView();
            this.footer = new FooterView();

            this.newsCollection = new NewsCollection();
            this.eventsCollection = new EventsCollection();
            this.resultsCollection = new ResultsCollection();
            this.sessionCollection = new SessionCollection();

            this.router = new Router({container: this.container, newsCol: this.newsCollection, eventsCol: this.eventsCollection});
            this.newsRouter = new NewsRouter({container: this.container, newsCol: this.newsCollection});
            this.eventsRouter = new EventsRouter({container: this.container, eventsCol: this.eventsCollection});
            this.resultsRouter = new ResultsRouter({container: this.container, resultsCol: this.resultsCollection});
            this.userRouter = new UserRouter({container: this.container});
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
            var sessionFetch = this.sessionCollection.fetch();

            $.when(newsFetch, eventsFetch, resultsFetch, sessionFetch).then(function(){
                Backbone.history.start();
            });
        }
    });

    return AppView;
});
