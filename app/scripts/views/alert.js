/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AlertView = Backbone.View.extend({
        className: 'alert alert-danger alert-dismissable',

        template: JST['app/scripts/templates/alert.ejs'],

        initialize: function(options) {
            this.errors = options.errors;
        },

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },
    });

    return AlertView;
});
