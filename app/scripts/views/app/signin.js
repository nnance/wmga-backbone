/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/formbase',
], function ($, _, Backbone, JST, FormBaseView) {
    'use strict';

    var SignInView = FormBaseView.extend({
        template: JST['app/scripts/templates/app/signin.ejs'],

        events: {
            'click .btn': 'saveButton'
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
        }
    });

    return SignInView;
});
