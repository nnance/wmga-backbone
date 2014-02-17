/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var BaseView = Backbone.View.extend({

        render: function() {
            if (this.template)
                this.$el.html( this.template( this ) );
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

        setView: function(view) {
            this.removeSubViews();
            this.insertView(view, this.$el);
        },

        insertView: function(view, location) {
            if (!this._subViews)
                this._subViews = [view];
            else
                this._subViews.push(view);

            if (_.isObject(location))
                location.append(view.el);
            else if (_.isString(location))
                this.$(location).append(view.el);
            else
                this.$el.append(view.el);
        },

        removeSubViews: function() {
            _.each(this._subViews, function(subView, i){
                subView.remove();
                delete this._subViews[i];
            }, this);
        },

        remove: function() {
            this.removeSubViews();
            Backbone.View.prototype.remove.apply(this, arguments);
        },

    });

    return BaseView;
});
