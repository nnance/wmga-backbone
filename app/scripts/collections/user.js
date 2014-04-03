/*global define*/

define([
    'underscore',
    'backbone',
    'appsettings',
    'models/user'
], function (_, Backbone, AppSettings, UserModel) {
    'use strict';

    var UserCollection = Backbone.Collection.extend({
        url: AppSettings.getBaseURL() + '/rest/users',

        model: UserModel,

        comparator: function (a) {
            return a.getFullName().toLowerCase();
        }
    });

    return UserCollection;
});
