/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'backbone.stickit'
], function ($, _, Backbone, JST, BBStickit) {
    'use strict';

    var NewsFormView = Backbone.View.extend({
        template: JST['app/scripts/templates/news/form.ejs'],

        events: {
            'click #save-button': 'saveButton',
            'click #cancel-button': 'cancelButton'
        },

        bindings: {
            '#title': 'title',
            '#description': 'description',
            '#itemdate': 'itemdate',
            '#itemtime': 'itemtime'
        },

        render: function() {
            this.$el.html( this.template( this ) );
            this.stickit();
            return this;
        },

        saveButton: function() {
            //TODO: must impliment
            if (!this.model.id)
                this.collection.add(this.model);
            Backbone.history.navigate('#news', true);
        },

        cancelButton: function() {
            history.back(1);
        }
    });

    return NewsFormView;
});
