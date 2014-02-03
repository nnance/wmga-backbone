/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'backbone.viewmanager',
    'backbone.stickit',
    'backbone.validation',
    'views/alert'
], function ($, _, Backbone, JST, BBViewManager, BBStickit, BBValidation, AlertView) {
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
                if (this.prepareFiles) {
                    this.uploadFiles();
                } else {
                    this.model.save();
                }
            }
        },

        prerpareUpload: function(event) {
            this.prepareFiles = event.target.files;
        },

        uploadFiles: function() {
            var data = new FormData();
            $.each(this.prepareFiles, function(key, value) {
                data.append(key, value);
            });

            $.ajax({
                url: AppSettings.baseURL + '/rest/attachments',
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: false, // Don't process the files
                contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                success: _.bind(function(data, textStatus, jqXHR) {
                    this.model.save();
                }, this),
                error: _.bind(function(jqXHR, textStatus, errorThrown) {
                    handleErrors(this.model, textStatus);
                }, this)
            });
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
