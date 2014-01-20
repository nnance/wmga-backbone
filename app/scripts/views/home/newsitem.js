/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var HomeNewsitemView = Backbone.View.extend({
        template: JST['app/scripts/templates/home/newsitem.ejs'],

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },
    });

    return HomeNewsitemView;
});
