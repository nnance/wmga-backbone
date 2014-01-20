/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var EventsIndexView = Backbone.View.extend({
        template: JST['app/scripts/templates/events/index.ejs'],

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },
    });

    return EventsIndexView;
});
