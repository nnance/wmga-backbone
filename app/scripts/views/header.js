/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'templates'
], function ($, _, Backbone, Bootstrap, JST) {
    'use strict';

    var HeaderView = Backbone.View.extend({
        template: JST['app/scripts/templates/header.ejs'],

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },

    });

    return HeaderView;
});
