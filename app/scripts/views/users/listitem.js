/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/listitembase'
], function ($, _, Backbone, JST, ListItemBaseView) {
    'use strict';

    var UsersListitemView = ListItemBaseView.extend({
        template: JST['app/scripts/templates/users/listitem.ejs'],
    });

    return UsersListitemView;
});
