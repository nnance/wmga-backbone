/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/home/newsitem',
    'views/home/eventsitem'
], function ($, _, Backbone, JST, NewsItemView, EventsItemView) {
    'use strict';

    var HomeIndexView = Backbone.View.extend({

        template: JST['app/scripts/templates/home/index.ejs'],

        initialize: function(options) {
            this.news = options.news;
            this.listenTo(this.news, 'sync', this.renderNews);
        },

        render: function() {
            this.$el.html( this.template( this ) );
            this.renderNews();
            var eventsView = new EventsItemView();
            this.insertView(eventsView.render(), '#events-item');
            return this;
        },

        renderNews: function() {
            var recentArticle = this.news.at(0);
            if (recentArticle) {
                var newsView = new NewsItemView({model: recentArticle});
                this.insertView(newsView.render(), '#news-item');
            }
        }
    });

    return HomeIndexView;
});
