/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/requestpassword',
    'views/formbase'
], function ($, _, Backbone, JST, RequestPassword, BaseFormView) {
    'use strict';

    var PasswordStepView = BaseFormView.extend({
        template: JST['app/scripts/templates/signup/passwordstep.ejs'],

        events: {
            'click .btn': 'nextStep',
            'click #forgotPassword': 'sendPasswordEmail'
        },

        nextStep: function() {
            event.preventDefault();
            this.model.set(this.serializeForm('form'));

            this.listenToOnce(this.session, 'signedin', this.nextStepSuccess);
            this.session.validateSession(this.model.get('email'), this.model.get('password'))
            .fail( _.bind(function(jqXHR, textStatus, errorThrown) {
                this.handleErrors(this.model, {response: 'password does not match'});
            },this));

        },

        nextStepSuccess: function() {
            var url = '#signup/paynow';
            if (this.session.get('paid')) {
                url = '#membership';
            }
            Backbone.history.navigate(url, true);
        },

        sendPasswordEmail: function() {
            event.preventDefault();
            var passwordEmail = new RequestPassword({email: this.model.get('email')});
            passwordEmail.save()
            .done(_.bind(function() {
                this.handleErrors(this.model,{result: 'Please check your email for your password.'});
            },this));
        }
    });

    return PasswordStepView;
});
