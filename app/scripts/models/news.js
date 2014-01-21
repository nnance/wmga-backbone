/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var NewsModel = Backbone.Model.extend({
        defaults: {
        },

        initialize: function() {
            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            this.set('itemdate', month + '/' + day + '/' + year);
        }
    });

    return NewsModel;
});
