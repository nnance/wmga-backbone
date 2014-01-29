/*global define*/

define([
    'models/base',
    'appsettings'
    ], function (BaseModel, AppSettings) {
        'use strict';

        var NewsModel = BaseModel.extend({

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
                return {
                    itemdate:  this.now()
                }
            }
        });

        return NewsModel;
    });
