/*global define*/

define([
    'underscore',
    'backbone',
    'appsettings',
    'models/events'
], function (_, Backbone, AppSettings, EventsModel) {
    'use strict';

    var EventsCollection = Backbone.Collection.extend({
        url: AppSettings.baseURL + '/rest/events',

        model: EventsModel
    });

    return EventsCollection;
});
