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

        initialize: function(options) {
            BaseFormView.prototype.initialize.apply(this,arguments);
            this.dataManager = options.dataManager;
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
                        this.listenToOnce(this.session,'signedin', this.initData);
                        this.session.signin(this.model,true);
                    },this),
                    error: _.bind(function(model, response, options) {
                        this.handleError(model, response);
                    },this)
                });
            }

        },

        initData: function() {
            this.dataManager.loadSecureData(_.bind(function(){
                Backbone.history.navigate('#signup/createpaynow', true);
            },this));
        },

        nextStepError: function(col, resp, opt) {
            this.showErrors(resp);
        }
    });

    return CreateStep;
});
