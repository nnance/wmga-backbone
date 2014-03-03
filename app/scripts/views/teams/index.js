/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewbase',
], function ($, _, Backbone, JST, BaseView) {
    'use strict';

    var TeamsIndexView = BaseView.extend({
        template: JST['app/scripts/templates/teams/index.ejs'],

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

    return TeamsIndexView;
});
