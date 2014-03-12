/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/listitembase'
], function ($, _, Backbone, JST, ListItemBaseView) {
    'use strict';

    var TeamsListitemMemberView = ListItemBaseView.extend({
        template: JST['app/scripts/templates/teams/listitemmember.ejs'],
        tagName: 'tr'
    });

    return TeamsListitemMemberView;
});
