/*global define*/

define([
    'underscore',
    'backbone',
    'appsettings',
    'models/news'
], function (_, Backbone, AppSettings, NewsModel) {
    'use strict';

    var NewsCollection = Backbone.Collection.extend({
        url: AppSettings.baseURL + '/rest/articles',

        model: NewsModel,

        comparator: function (a, b) {
            return a.get('itemdate') > b.get('itemdate') ? -1 : 1;
        }
    });

    return NewsCollection;
});
