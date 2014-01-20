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
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },
    });

    return HomeNewsitemView;
});
