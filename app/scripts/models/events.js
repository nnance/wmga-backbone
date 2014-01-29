/*global define*/

define([
    'models/base',
    'appsettings'
    ], function (BaseModel, AppSettings) {
        'use strict';

        var EventsModel = BaseModel.extend({

            urlRoot: AppSettings.baseURL + '/rest/events',

            validation: {
                title: {
                    required: true
                },
                description: {
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
