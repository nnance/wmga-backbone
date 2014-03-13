/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/signin',
    'models/requestpassword',
    'views/formbase'
], function ($, _, Backbone, JST, SignInModel, RequestPassword, BaseFormView) {
    'use strict';

    var PasswordStepView = BaseFormView.extend({
        template: JST['app/scripts/templates/signup/passwordstep.ejs'],

        events: {
            'click .btn': 'nextStep',
            'click #forgotPassword': 'sendPasswordEmail'
        },

        initialize: function(options) {
            BaseFormView.prototype.initialize.apply(this,arguments);
            this.dataManager = options.dataManager;
        },

        nextStep: function(e) {
            e.preventDefault();
            this.model.set(this.serializeForm('form'));

            this.session.validateAccount(this.model.get('email'), this.model.get('password'))
            .done( _.bind(function(data, textStatus, jqXHR){
                this.nextStepSuccess(data);
            },this))
            .fail( _.bind(function(jqXHR, textStatus, errorThrown) {
                this.handleErrors(this.model, {response: 'password does not match'});
            },this));

        },

        nextStepSuccess: function(data) {
            this.session.signin(data,true);
            this.dataManager.loadSecureData(_.bind(function(){
                var url = '#signup/paynow';
                if (this.session.get('paid')) {
                    url = '#membership';
                }
                Backbone.history.navigate(url, true);
            },this));
        },

        sendPasswordEmail: function(e) {
            e.preventDefault();
            var passwordEmail = new RequestPassword({email: this.model.get('email')});
            passwordEmail.save()
            .done(_.bind(function() {
                this.handleErrors(this.model,{result: 'Please check your email for your password.'});
            },this));
        }
    });

    return PasswordStepView;
});
