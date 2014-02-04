/*global define*/

define([
    'underscore',
    'backbone',
    'appsettings',
    'models/results'
], function (_, Backbone, AppSettings, ResultsModel) {
    'use strict';

    var ResultsCollection = Backbone.Collection.extend({
        url: AppSettings.baseURL + '/rest/results',

        model: ResultsModel,

        comparator: function (a, b) {
            return a.get('itemdate') > b.get('itemdate') ? -1 : 1;
        }
    });

    return ResultsCollection;
});
