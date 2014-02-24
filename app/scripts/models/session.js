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
            return signin.save(this.attributes, {
                error: _.bind(this.signout, this)
            });
        },

        signin: function(userid, email, name, token) {
            this.save({
                userid: userid,
                email: email,
                name: name,
                password: token,
                signedIn: true
            });
        },

        signout: function() {
            this.save({
                signedIn: false
            });
        },
    });

    return SessionModel;
});
