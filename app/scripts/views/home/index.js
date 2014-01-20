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

        render: function() {
            this.$el.html( this.template( this ) );

            var newsView = new NewsItemView();
            this.insertView(newsView.render(), '#news-item');

            var eventsView = new EventsItemView();
            this.insertView(eventsView.render(), '#events-item');
            return this;
        },
    });

    return HomeIndexView;
});
