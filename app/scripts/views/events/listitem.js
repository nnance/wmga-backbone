/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/listitembase'
], function ($, _, Backbone, JST, ListItemBaseView) {
    'use strict';

    var EventsListitemView = ListItemBaseView.extend({
        template: JST['app/scripts/templates/events/listitem.ejs'],
    });

    return EventsListitemView;
});
