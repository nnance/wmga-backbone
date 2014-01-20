/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var NewsItemdetailView = Backbone.View.extend({
        tagName: 'tr',

        template: JST['app/scripts/templates/news/itemdetail.ejs'],

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },
    });

    return NewsItemdetailView;
});
