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
        },

        render: function() {
            this.$el.html( this.template( this ) );

            var newsView = new NewsItemView({model: this.news.at(0)});
            this.insertView(newsView.render(), '#news-item');

            var eventsView = new EventsItemView();
            this.insertView(eventsView.render(), '#events-item');
            return this;
        },
    });

    return HomeIndexView;
});
