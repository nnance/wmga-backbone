/*global define*/

define([
    'underscore',
    'backbone',
    'backbone.validation',
    'backbone.datetime',
    'appsettings'
    ], function (_, Backbone, BBValidation, BBDateTime, AppSettings) {
        'use strict';

        var EventsModel = Backbone.Model.extend({

            idAttribute: '_id',

            dateFormat: AppSettings.dateFormat,

            urlRoot: AppSettings.baseURL + '/rest/events',

            validation: {
                title: {
                    required: true
                },
                description: {
                    required: true
                },
                startdate: {
                    required: true
                }
            },

            defaults: function() {
                return {
                    startdate:  this.now(),
                    enddate: this.now()
                }
            }
        });

        return EventsModel;
    });
