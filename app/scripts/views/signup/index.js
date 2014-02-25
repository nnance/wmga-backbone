/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/formbase'
], function ($, _, Backbone, JST, BaseView) {
    'use strict';

    var IndexView = BaseView.extend({
        template: JST['app/scripts/templates/signup/index.ejs']
    });

    return IndexView;
});
