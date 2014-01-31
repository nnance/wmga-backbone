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

        comparator: 'itemdate'
    });

    return NewsCollection;
});
