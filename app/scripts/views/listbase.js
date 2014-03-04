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

        initialize: function(options) {
            this.listenTo(this.collection, 'reset,sort', this.renderList);
            this.listenTo(this.collection, 'add', this.renderItem);
        },

        render: function() {
            BaseView.prototype.render.apply(this,arguments);
            if (this.addButtonTemplate && this.session && this.session.get('admin')) {
                var inputGroup = this.$('.input-group');
                var btnGroup = this.$('.btn-group');
                if (inputGroup) {
                    inputGroup.append(this.addButtonTemplate(this));
                } else {
                    btnGroup.append(this.addButtonTemplate(this));
                }
            }
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
