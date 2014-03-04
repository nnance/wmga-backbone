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

        validateSession: function(email, password) {
            var signin = new SignInModel();

            if (email && password) {
                this.set({
                    email: email,
                    password: password
                })
            }

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
                paid: user.get('paid')
            });
            var promise;
            if (remember) promise = this.save();
            $.when(promise).done(_.bind(function(){
                this.set('signedIn',true);
            },this));
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
