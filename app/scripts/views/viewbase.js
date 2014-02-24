/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'backbone.viewmanager'
], function ($, _, Backbone, JST, BBViewManager) {
    'use strict';

    var BaseView = Backbone.View.extend({

        render: function() {
            if (this.template) {
                this.$el.html( this.template( this ) );
            }
            return this;
        },

        getAttr: function(attribute) {
            if (this.model) {
                return this.model.get(attribute);
            }
        },

        getDateAttr: function(attribute) {
            if (this.model) {
                return this.model.dateAsString(attribute);
            }
        },

    });

    return BaseView;
});
