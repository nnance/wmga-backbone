/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/formbase'
], function ($, _, Backbone, JST, BaseFormView) {
    'use strict';

    var CreateStep = BaseFormView.extend({
        template: JST['app/scripts/templates/signup/createstep.ejs'],

        events: {
            'click .btn-primary': 'nextStep',
            'click .btn-default': 'createStep'
        },

        nextStep: function() {
            event.preventDefault();

            this.removeSubViews();
            var formData = this.serializeForm('form');

            this.model.set(formData, {validate: true});
            if (this.model.isValid()) {
                this.collection.fetch({data: {email: formData.email},
                    success: _.bind(this.nextStepSuccess,this),
                    error: _.bind(this.nextStepError,this)
                });
            }
        },

        createStep: function() {
            event.preventDefault();
            Backbone.history.navigate('#signup/email', true);
        },

        nextStepSuccess: function(col, resp, opt) {
            if (col.length !== 0) {
                this.showErrors({email: 'Email address alredy exists.'});
                this.$('.hidden').removeClass('hidden');
            } else {
                this.model.save({},{
                    success: _.bind(function() {
                        this.session.signin(this.model,true);
                        Backbone.history.navigate('#signup/createpaynow', true);
                    },this),
                    error: _.bind(function(model, response, options) {
                        this.handleError(model, response);
                    },this)
                });
            }

        },

        nextStepError: function(col, resp, opt) {
            this.showErrors(resp);
        }
    });

    return CreateStep;
});
