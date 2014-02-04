/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'moment',
    'views/users/listitem'
], function ($, _, Backbone, JST, Moment, ItemView) {
    'use strict';

    var UsersListView = Backbone.View.extend({
        template: JST['app/scripts/templates/users/list.ejs'],

        events: {
            'click #filter': 'switchFilter'
        },

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
        },

        switchFilter: function() {
            Backbone.history.navigate('#users/filter/' + event.target.id, true);
        }
    });

    return UsersListView;
});
