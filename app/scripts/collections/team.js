/*global define*/

define([
    'underscore',
    'backbone',
    'appsettings',
    'models/team'
], function (_, Backbone, AppSettings, TeamModel) {
    'use strict';

    var TeamCollection = Backbone.Collection.extend({
        url: AppSettings.getBaseURL() + '/rest/teams',

        model: TeamModel,

        comparator: function (a) {
            return a.get('name');
        }
    });

    return TeamCollection;
});
