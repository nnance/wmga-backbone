define([
    'underscore',
    'backbone',
    'backbone.localstorage',
    'models/session',
], function (_, Backbone, BBLocalStorage, SessionModel) {
    'use strict';

    var SessionCollection = Backbone.Collection.extend({
        model: SessionModel,
        localStorage: new Backbone.LocalStorage('wmga')
    });

    return SessionCollection;
});
