/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/events/listitem'
], function ($, _, Backbone, JST, ItemView) {
    'use strict';

    var EventsListView = Backbone.View.extend({
        template: JST['app/scripts/templates/events/list.ejs'],

        initialize: function(options) {
            this.listenTo(this.collection, 'reset,sort', this.renderList);
            this.listenTo(this.collection, 'add', this.addRow);
        },

        render: function() {
            this.$el.html( this.template( this ) );
            this.renderList();
            return this;
        },

        renderList: function() {
            this.removeSubViews();
            this.collection.forEach(this.addRow, this);
        },

        addRow: function(model) {
            var view = new ItemView({model: model});
            this.insertView(view.render(),'.container');
        }
    });

    return EventsListView;
});
