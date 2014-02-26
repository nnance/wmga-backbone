define([
    'underscore',
    'backbone',
    'backbone.validation',
    'models/signin'
], function (_, Backbone, BBValidation, SignInModel) {
    'use strict';

    var SessionModel = Backbone.Model.extend({
        defaults: {
            signedIn: false
        },

        validateSession: function() {
            var signin = new SignInModel();
            return signin.save({
                email: this.get('email'),
                password: this.get('password')
            }, {
                success: _.bind(function(model){
                    this.signin(model,true);
                }, this),
                error: _.bind(this.signout, this)
            });
        },

        signin: function(user, remember) {
            this.set({
                userid: user.id,
                email: user.get('email'),
                name: user.get('firstname') + ' ' + user.get('lastname'),
                password: user.get('passwordHash'),
                admin: user.get('admin'),
                treasure: user.get('treasure'),
                signedIn: true
            });
            if (remember) this.save();
        },

        signout: function() {
            this.save({
                signedIn: false,
                admin: false,
                treasure: false,
            });
        },
    });

    return SessionModel;
});
