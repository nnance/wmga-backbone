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
            if (this.model.isValid(true))
                this.model.save();
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
