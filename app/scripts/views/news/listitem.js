/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/listitembase'
], function ($, _, Backbone, JST, ListItemBaseView) {
    'use strict';

    var NewsListitemView = ListItemBaseView.extend({
        template: JST['app/scripts/templates/news/listitem.ejs'],
    });

    return NewsListitemView;
});
