/*global define*/

define([
    'underscore',
    'backbone',
    'appsettings',
    'models/events'
], function (_, Backbone, AppSettings, EventsModel) {
    'use strict';

    var EventsCollection = Backbone.Collection.extend({
        url: AppSettings.getBaseURL() + '/rest/events',

        model: EventsModel,

        comparator: function (a, b) {
            return a.get('startdate') > b.get('startdate') ? -1 : 1;
        }

    });

    return EventsCollection;
});
