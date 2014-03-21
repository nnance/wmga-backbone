/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewbase',
    'views/home/newsitem',
    'views/home/eventsitem'
], function ($, _, Backbone, JST, BaseView, NewsItemView, EventsItemView) {
    'use strict';

    var HomeIndexView = BaseView.extend({

        template: JST['app/scripts/templates/home/index.ejs'],

        initialize: function(options) {
            this.newsCollection = options.newsCol;
            this.eventsCollection = options.eventsCol;
            this.showSignUp = options.showSignUp;

            this.listenTo(this.newsCollection, 'sync', this.renderNews);
            this.listenTo(this.eventsCollection, 'sync', this.renderEvent);
        },

        render: function() {
            BaseView.prototype.render.apply(this,arguments);
            this.renderNews();
            this.renderEvent();
            return this;
        },

        renderNews: function() {
            var recentArticle = this.newsCollection.at(0);
            if (recentArticle) {
                var newsView = new NewsItemView({model: recentArticle});
                this.insertView(newsView.render(), '#news-item');
            }
        },

        renderEvent: function() {
            var recentEvent = this.eventsCollection.at(0);
            var now = moment();
            this.eventsCollection.forEach(function(event) {
                if (event.getAsDate('startdate').isAfter(now)) {
                    recentEvent = event;
                }
            }, this);
            if (recentEvent) {
                var eventsView = new EventsItemView({model: recentEvent});
                this.insertView(eventsView.render(), '#events-item');
            }
        }
    });

    return HomeIndexView;
});
