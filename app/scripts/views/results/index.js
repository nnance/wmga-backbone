/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewbase',
], function ($, _, Backbone, JST, BaseView) {
    'use strict';

    var ResultsIndexView = BaseView.extend({
        template: JST['app/scripts/templates/results/index.ejs'],

        initialize: function(options) {
            BaseView.prototype.initialize.apply(this,arguments);
            this.indexView = options.view;
        },

        render: function() {
            BaseView.prototype.render.apply(this,arguments);
            this.insertView(this.indexView.render(), '#index');
            return this;
        }
    });

    return ResultsIndexView;
});
