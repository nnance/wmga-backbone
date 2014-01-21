define([
    'underscore',
    'backbone',
    'backbone.localstorage',
], function (_, Backbone, BBLocalStorage) {
    'use strict';

    var SessionModel = Backbone.Model.extend({
        defaults: {
            signedIn: false
        },

        signin: function(userid, token) {
            this.set({
                userid: userid,
                token: token,
                signedIn: true
            });
            this.save();
        },

        signout: function() {
            this.set('signedIn', false);
            this.save();
        },
    });

    var SessionCollection = Backbone.Collection.extend({
        model: SessionModel,
        localStorage: new Backbone.LocalStorage('wmga')
    });

    return { SessionCollection, SessionModel };
});