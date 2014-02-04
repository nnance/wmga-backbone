/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/users/list',
], function ($, _, Backbone, JST, ListView, ItemView) {
    'use strict';

    var UsersIndexView = Backbone.View.extend({
        template: JST['app/scripts/templates/users/index.ejs'],

        initialize: function(options) {
            this.indexView = options.view;
        },

        render: function() {
            this.$el.html( this.template( this ) );
            this.insertView(this.indexView.render(), '#index');
            return this;
        }
    });

    return UsersIndexView;
});
