/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewbase',
    'backbone.validation',
    'backbone.filestyle',
    'views/alert',
    'appsettings'
], function ($, _, Backbone, JST, BaseView, BBValidation, BBFileStyle, AlertView, AppSettings) {
    'use strict';

    var FormBaseView = BaseView.extend({

        initialize: function(options) {
            BaseView.prototype.initialize.apply(this,arguments);

            if (this.model) {
                Backbone.Validation.bind(this);
                this.listenTo(this.model, 'validated:invalid', this.handleErrors);
                this.listenTo(this.model, 'sync', this.saveCompleted);
                this.listenTo(this.model, 'error', this.saveFailed);
                this.listenTo(this, 'uploaded', this.fileuploadCompleted);
            }
        },

        serializeForm: function(selector) {
            var result = {};
            var fields = this.$(selector).serializeArray();
            _.each(fields, function(field) {
                if (result[field.name]) {
                    if (!result[field.name].push) {
                        result[field.name] = [result[field.name]];
                    }
                    result[field.name].push(field.value || '');
                } else {
                    result[field.name] = field.value || '';
                }
            });
            return result;
        },

        handleErrors: function(model, errors) {
            // restore the model
            model.set(model.previousAttributes());

            // show the errors in an alert area
            var alertView = new AlertView({errors: errors});
            this.insertView(alertView.render(), '#alert');

            // highlight the fields with errors
            for (var key in errors) {
                this.$('#' + key).parent().addClass('has-error');
            }
        },

        sendFile: function(callback) {
            this.filestyleUpload({
                url: AppSettings.getBaseURL() + '/rest/attachments',
                success: _.bind(function(data, textStatus, jqXHR) {
                    this.trigger('uploaded', arguments);
                }, this),
                error: _.bind(function(jqXHR, textStatus, errorThrown) {
                    handleErrors(this.model, textStatus);
                }, this)
            });
        },

        saveFailed: function(model, xhr, options) {
            this.handleErrors(model,{response: xhr.responseText});
        },

        cancelButton: function() {
            history.back(1);
        },

        saveButton: function() {
            this.removeSubViews();
            var formData = this.serializeForm('form');
            this.model.save(formData);
        },

        saveCompleted: function(model, response, options) {
            this.collection.add(model);
            if (this.filestyleHasFiles()) {
                this.filestyleUpload();
            } else {
                this.routeSuccessfulResult();
            }
        },

        fileuploadCompleted: function() {
            this.routeSuccessfulResult();
        },

        routeSuccessfulResult: function() {
            // noop function to be added by subclass
        }

    });

    return FormBaseView;
});
