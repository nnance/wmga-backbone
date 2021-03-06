/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewbase'
], function ($, _, Backbone, JST, BaseView) {
    'use strict';

    var HomeNewsitemView = BaseView.extend({
        template: JST['app/scripts/templates/home/newsitem.ejs'],
    });

    return HomeNewsitemView;
});
