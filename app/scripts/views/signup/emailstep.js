/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/formbase'
], function ($, _, Backbone, JST, BaseFormView) {
    'use strict';

    var EmailStepView = BaseFormView.extend({
        template: JST['app/scripts/templates/signup/emailstep.ejs'],

        events: {
            'click .btn-primary': 'nextStep',
            'click .btn-default': 'createStep'
        },

        nextStep: function() {
            event.preventDefault();

            this.removeSubViews();
            var formData = this.serializeForm('form');
            this.model.set(formData, {validate: true});

            if (this.model.isValid('email')) {
                this.collection.fetch({data: formData,
                    success: _.bind(this.nextStepSuccess,this),
                    error: _.bind(this.nextStepError,this)
                });
            }
        },

        showErrors: function(errors) {
            BaseFormView.prototype.showErrors.call(this, _.pick(errors,'email'));
        },

        createStep: function() {
            event.preventDefault();
            Backbone.history.navigate('#signup/create', true);
        },

        nextStepSuccess: function(col, resp, opt) {
            if (col.length === 0) {
                this.showErrors({email: 'Email address not found.'});
                this.$('.hidden').removeClass('hidden');
            } else {
                Backbone.history.navigate('#signup/password', true);
            }

        },

        nextStepError: function(col, resp, opt) {
            this.showErrors(resp);
        }
    });

    return EmailStepView;
});
