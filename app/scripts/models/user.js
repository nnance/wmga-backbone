/*global define*/

define([
    'underscore',
    'backbone',
    'backbone.validation',
    'backbone.datetime',
    'appsettings'
    ], function (_, Backbone, BBValidation, BBDateTime, AppSettings) {
        'use strict';

        var UserModel = Backbone.Model.extend({

            idAttribute: '_id',

            dateFormat: AppSettings.dateFormat,

            urlRoot: AppSettings.baseURL + '/rest/users',

            validation: {
                username: {
                    required: true
                },
                firstname: {
                    required: true
                },
                lastname: {
                    required: true
                }
            },

            getFullName: function() {
                return this.get('lastname') + ', ' + this.get('firstname');
            }
        });

        return UserModel;
    });
