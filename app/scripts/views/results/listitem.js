/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/listitembase'
], function ($, _, Backbone, JST, ListItemBaseView) {
    'use strict';

    var ResultsListitemView = ListItemBaseView.extend({
        template: JST['app/scripts/templates/results/listitem.ejs'],
    });

    return ResultsListitemView;
});
