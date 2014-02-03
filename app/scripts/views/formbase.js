/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'backbone.viewmanager',
    'backbone.stickit',
    'backbone.validation',
    'backbone.filestyle',
    'views/alert',
    'appsettings'
], function ($, _, Backbone, JST, BBViewManager, BBStickit, BBValidation, BBFileStyle, AlertView, AppSettings) {
    'use strict';

    var FormBaseView = Backbone.View.extend({

        handleErrors: function(model, errors) {
            var alertView = new AlertView({errors: errors});
            this.insertView(alertView.render(), '#alert');
            for (var key in errors) {
                this.$('#' + key).parent().addClass('has-error');
            }
        },

        parseDate: function(val,options) {
            return this.model.formatDate(val);
        },

        convertToDate: function(val, options) {
            return this.model.stringToDate(val);
        },

        saveButton: function() {
            this.removeSubViews();
            if (this.model.isValid(true)) {
                if (this.filestyleHasFiles()) {
                    this.filestyleUpload({
                        url: AppSettings.baseURL + '/rest/attachments',
                        success: _.bind(function(data, textStatus, jqXHR) {
                            this.model.save();
                        }, this),
                        error: _.bind(function(jqXHR, textStatus, errorThrown) {
                            handleErrors(this.model, textStatus);
                        }, this)
                    });
                } else {
                    this.model.save();
                }
            }
        },

        saveFailed: function(model, xhr, options) {
            model.trigger('validated:invalid',model,{response: xhr.responseText});
        },

        cancelButton: function() {
            history.back(1);
        }
    });

    return FormBaseView;
});
