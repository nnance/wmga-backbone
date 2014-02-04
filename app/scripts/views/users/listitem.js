/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var UsersListitemView = Backbone.View.extend({
        template: JST['app/scripts/templates/users/listitem.ejs'],

        initialize: function(options) {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },
    });

    return UsersListitemView;
});
