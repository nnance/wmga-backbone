/*global define*/

define([
    'underscore',
    'backbone',
    'backbone.validation'
    ], function (_, Backbone, BBValidation) {
        'use strict';

        var NewsModel = Backbone.Model.extend({

            idAttribute: '_id',

            validation: {
                title: {
                    required: true
                },
                text: {
                    required: true
                }
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
