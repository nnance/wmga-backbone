/*global define*/

define([
    'underscore',
    'backbone',
    'backbone.validation',
    'backbone.datetime',
    'appsettings'
    ], function (_, Backbone, BBValidation, BBDateTime, AppSettings) {
        'use strict';

        var TeamModel = Backbone.Model.extend({

            idAttribute: '_id',

            dateFormat: AppSettings.dateFormat,

            urlRoot: AppSettings.getBaseURL() + '/rest/teams',

            validation: {
                name: {
                    required: true
                },

                teetime: {
                    required: true
                }
            },
        });

        return TeamModel;
    });
