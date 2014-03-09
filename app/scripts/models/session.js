define([
    'underscore',
    'backbone',
    'backbone.validation',
    'models/signin'
], function (_, Backbone, BBValidation, SignInModel) {
    'use strict';

    var SessionModel = Backbone.Model.extend({
        defaults: {
            signedin: false
        },

        validateSession: function(email, password) {
            var request;
            if (email && password) {
                request = this.validateAccount(email,password);
            } else {
                request = this.validateAccount(this.get('email'), this.get('password'));
            }
            request.done(_.bind(function(data){
                this.signin(data,true);
            }, this));
            request.fail(_.bind(this.signout, this));
        },

        validateAccount: function(email, password) {
            var signin = new SignInModel();

            return signin.save({
                email: email,
                password: password
            });
        },

        signin: function(user, remember) {
            this.set({
                userid: user._id,
                email: user.email,
                name: user.firstname + ' ' + user.lastname,
                password: user.passwordHash,
                admin: user.admin,
                treasure: user.treasure,
                paid: user.paid,
                signedin: true,
            });
            if (remember) this.save();
            this.trigger('signedin');
        },

        signout: function() {
            this.save({
                signedin: false,
                admin: false,
                treasure: false,
                remember: false
            });
            this.trigger('signedout');
        },
    });

    return SessionModel;
});
