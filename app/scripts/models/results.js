/*global define*/

define([
    'underscore',
    'backbone',
    'backbone.validation',
    'backbone.datetime',
    'appsettings'
    ], function (_, Backbone, BBValidation, BBDateTime, AppSettings) {
        'use strict';

        var ResultsModel = Backbone.Model.extend({

            idAttribute: '_id',

            dateFormat: AppSettings.dateFormat,

            urlRoot: AppSettings.getBaseURL() + '/rest/results',

            validation: {
                title: {
                    required: true
                },
                text: {
                    required: true
                }
            },

            defaults: function() {
                return {
                    itemdate:  this.now()
                }
            }
        });

        return ResultsModel;
    });
