/*global define*/

define([
    'underscore',
    'backbone',
    'backbone.validation',
    'appsettings'
    ], function (_, Backbone, BBValidation, AppSettings) {
        'use strict';

        var NewsModel = Backbone.Model.extend({

            idAttribute: '_id',

            urlRoot: AppSettings.baseURL + '/rest/articles',

            validation: {
                title: {
                    required: true
                },
                text: {
                    required: true
                }
            },

            defaults: function() {
                var currentDate = new Date();
                var day = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();
                return {
                    itemdate:  month + '/' + day + '/' + year
                }
            }
        });

        return NewsModel;
    });
