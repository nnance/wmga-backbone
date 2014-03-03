/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/listitembase'
], function ($, _, Backbone, JST, ListItemBaseView) {
    'use strict';

    var TeamsListitemView = ListItemBaseView.extend({
        template: JST['app/scripts/templates/teams/listitem.ejs'],
        tagName: 'tr'
    });

    return TeamsListitemView;
});
