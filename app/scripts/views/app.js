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

            this.newsCollection = new NewsCollection();
            this.eventsCollection = new EventsCollection();
            this.resultsCollection = new ResultsCollection();
            this.sessionCollection = new SessionCollection();

            this.header = new HeaderView({collection: this.sessionCollection});
            this.container = new BaseView();
            this.footer = new FooterView();

        },

        render: function() {
            this.insertView(this.header.render());
            this.insertView(this.container.render());
            this.insertView(this.footer.render());
        },

        initSession: function() {
            this.sessionCollection.fetch({success: _.bind(function(){
                if (this.sessionCollection.length === 0) {
                    this.sessionCollection.create({signedIn: false});
                }
                this.session = this.sessionCollection.at(0);

                this.router = new Router({container: this.container, session: this.session, newsCol: this.newsCollection, eventsCol: this.eventsCollection});
                this.newsRouter = new NewsRouter({container: this.container, newsCol: this.newsCollection});
                this.eventsRouter = new EventsRouter({container: this.container, eventsCol: this.eventsCollection});
                this.resultsRouter = new ResultsRouter({container: this.container, resultsCol: this.resultsCollection});
                this.userRouter = new UserRouter({container: this.container, session: this.session});

                var promises = [this.newsCollection.fetch()];
                promises.push(this.eventsCollection.fetch());
                promises.push(this.resultsCollection.fetch());
                if (this.session.get('signedIn'))
                    promises.push(this.session.validateSession());

                $.when(promises).then(function(){
                    Backbone.history.start();
                });
            },this)});
        }
    });

    return AppView;
});
