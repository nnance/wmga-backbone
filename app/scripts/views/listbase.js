/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewbase',
], function ($, _, Backbone, JST, BaseView) {
    'use strict';

    var ListBaseView = BaseView.extend({

        initialize: function() {
            BaseView.prototype.initialize.apply(this,arguments);
            this.listenTo(this.collection, 'reset,sort', this.renderList);
            this.listenTo(this.collection, 'add', this.renderItem);
        },

        render: function() {
            BaseView.prototype.render.apply(this,arguments);
            this.renderList();
            return this;
        },

        renderList: function() {
            this.removeSubViews();
            this.collection.forEach(this.renderItem, this);
        },

        renderItem: function(model) {
            // must be provided by subclasses
        },

    });

    return ListBaseView;
});
