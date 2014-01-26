/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'backbone.viewmanager',
    'backbone.stickit',
    'backbone.validation',
    'jqueryui/jquery.ui.core',
    'jqueryui/jquery.ui.widget',
    'jqueryui/jquery.ui.button',
    'jqueryui/jquery.ui.datepicker',
    'views/alert'
], function ($, _, Backbone, JST, BBViewManager, BBStickit, BBValidation, JQCore, JQWidget, JQButton, JQDatePicker, AlertView) {
    'use strict';

    var NewsFormView = Backbone.View.extend({
        template: JST['app/scripts/templates/news/form.ejs'],

        events: {
            'click #save-button': 'saveButton',
            'click #cancel-button': 'cancelButton'
        },

        bindings: {
            '#title': 'title',
            '#text': 'text',
            '#itemdate': 'itemdate',
        },

        initialize: function() {
            Backbone.Validation.bind(this);
            this.listenTo(this.model, 'validated:invalid', this.handleErrors);
            this.listenTo(this.model, 'sync', this.saveCompleted);
            this.listenTo(this.model, 'error', this.saveFailed);
        },

        render: function() {
            this.$el.html( this.template( this ) );
            this.$('#itemdate').datepicker();
            this.stickit();
            return this;
        },

        handleErrors: function(model, errors) {
            var alertView = new AlertView({errors: errors});
            this.insertView(alertView.render(), '#alert');
            for (var key in errors) {
                this.$('#' + key).parent().addClass('has-error');
            }
        },

        saveButton: function() {
            this.removeSubViews();
            if (this.model.isValid(true))
                this.model.save();
        },

        saveCompleted: function(model, response, options) {
            this.collection.add(model);
            Backbone.history.navigate('#news', true);
        },

        saveFailed: function(model, xhr, options) {
            model.trigger('validated:invalid',model,{response: xhr.responseText});
        },

        cancelButton: function() {
            history.back(1);
        }
    });

    return NewsFormView;
});
