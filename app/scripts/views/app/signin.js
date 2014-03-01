/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/requestpassword',
    'views/formbase',
], function ($, _, Backbone, JST, RequestPassword, FormBaseView) {
    'use strict';

    var SignInView = FormBaseView.extend({
        template: JST['app/scripts/templates/app/signin.ejs'],

        events: {
            'click .btn': 'saveButton',
            'click #forgotPassword': 'sendPasswordEmail'
        },

        initialize: function(options) {
            FormBaseView.prototype.initialize.apply(this, arguments);
            if (!options || !options.session)
                throw new Error('missing required session option');

            this.session = options.session;
        },

        saveFailed: function(model, xhr, options) {
            if (xhr.responseText) {
                this.handleErrors(model,{response: xhr.responseText});
            } else {
                this.handleErrors(model, {response: 'email / password not found!'});
            }
        },

        saveCompleted: function(model, response, options) {
            var remember = this.$('input:checkbox:checked').val();
            this.session.signin(model, remember);
            history.back(1);
        },

        sendPasswordEmail: function(events) {
            events.preventDefault();
            this.removeSubViews();
            var passwordEmail = new RequestPassword();
            _.extend(passwordEmail, Backbone.Validation.mixin);
            this.listenTo(passwordEmail, 'validated:invalid', this.handleErrors);
            passwordEmail.save(this.serializeForm('form'),{
                success: _.bind(function() {
                    this.handleErrors(this.model,{result: 'Please check your email for your password.'});
                },this)
            });
        }

    });

    return SignInView;
});
