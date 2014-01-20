/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var HomeEventsitemView = Backbone.View.extend({
        template: JST['app/scripts/templates/home/eventsitem.ejs'],

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },
    });

    return HomeEventsitemView;
});
