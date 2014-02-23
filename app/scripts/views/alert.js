/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewbase',
], function ($, _, Backbone, JST, BaseView) {
    'use strict';

    var AlertView = BaseView.extend({
        className: 'alert alert-danger alert-dismissable',

        template: JST['app/scripts/templates/alert.ejs'],

        initialize: function(options) {
            BaseView.prototype.initialize.apply(this,arguments);
            this.errors = options.errors;
        },
    });

    return AlertView;
});
