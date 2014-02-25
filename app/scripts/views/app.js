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
    'routes/signup',
    'collections/session',
    'views/app/header',
    'views/app/footer',
], function ($, _, Backbone, BaseView, Router, NewsRouter, EventsRouter, ResultsRouter, UserRouter, SignUpRouter, SessionCollection, HeaderView, FooterView) {
    'use strict';

    var AppView = BaseView.extend({
        initialize: function() {
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

                this.router = new Router({container: this.container, session: this.session});
                this.newsRouter = new NewsRouter({container: this.container});
                this.eventsRouter = new EventsRouter({container: this.container});
                this.resultsRouter = new ResultsRouter({container: this.container});
                this.signupRouter = new SignUpRouter({container: this.container, session: this.session});
                this.userRouter = new UserRouter({container: this.container, session: this.session});

                if (this.session.get('signedIn')){
                    this.session.validateSession();
                }
                Backbone.history.start();
            },this)});
        }
    });

    return AppView;
});
