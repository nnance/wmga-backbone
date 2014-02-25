/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/user',
    'views/formbase'
], function ($, _, Backbone, JST, UserCollection, BaseFormView) {
    'use strict';

    var CreateStep = BaseFormView.extend({
        template: JST['app/scripts/templates/signup/createstep.ejs'],

        events: {
            'click .btn-primary': 'nextStep',
            'click .btn-default': 'createStep'
        },

        nextStep: function(events) {
            events.preventDefault();

            this.removeSubViews();
            var formData = this.serializeForm('form');

            this.model.set(formData, {validate: true});
            if (this.model.isValid()) {
                var users = new UserCollection();
                users.fetch({data: formData,
                    success: _.bind(this.nextStepSuccess,this),
                    error: _.bind(this.nextStepError,this)
                });
            }
        },

        createStep: function(events) {
            events.preventDefault();
            Backbone.history.navigate('#signup/email', true);
        },

        nextStepSuccess: function(col, resp, opt) {
            if (col.length !== 0) {
                this.showErrors({email: 'Email address alredy exists.'});
                this.$('.hidden').removeClass('hidden');
            } else {
                Backbone.history.navigate('#signup/password', true);
            }

        },

        nextStepError: function(col, resp, opt) {
            this.showErrors(resp);
        }
    });

    return CreateStep;
});
