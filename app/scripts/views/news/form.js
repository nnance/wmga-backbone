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
            //TODO: add save
            this.removeSubViews();
            if (this.model.isValid(true)) {
                if (this.model.isNew())
                    this.collection.add(this.model);
                this.model.save({},{
                    success: function(model, response, options) {
                        Backbone.history.navigate('#news', true);
                    },
                    error: function(model, xhr, options) {
                        model.trigger('validated:invalid',model,{response: xhr.responseText});
                    }
                });
            }
        },

        cancelButton: function() {
            history.back(1);
        }
    });

    return NewsFormView;
});
