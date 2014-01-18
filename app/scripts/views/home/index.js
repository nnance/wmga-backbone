/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var HomeIndexView = Backbone.View.extend({
        className: 'jumbotron masthead',

        template: JST['app/scripts/templates/home/index.ejs'],

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },
    });

    return HomeIndexView;
});
