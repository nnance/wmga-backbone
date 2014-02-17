/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewbase'
], function ($, _, Backbone, JST, BaseView) {
    'use strict';

    var HomeEventsitemView = BaseView.extend({
        template: JST['app/scripts/templates/home/eventsitem.ejs'],
    });

    return HomeEventsitemView;
});
