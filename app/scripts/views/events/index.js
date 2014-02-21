/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewbase',
], function ($, _, Backbone, JST, BaseView) {
    'use strict';

    var EventsIndexView = BaseView.extend({
        template: JST['app/scripts/templates/events/index.ejs'],

        initialize: function(options) {
            this.indexView = options.view;
        },

        render: function() {
            BaseView.prototype.render.apply(this,arguments);
            this.insertView(this.indexView.render(), '#index');
            return this;
        }
    });

    return EventsIndexView;
});
