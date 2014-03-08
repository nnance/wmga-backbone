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

            urlRoot: AppSettings.getBaseURL() + '/rest/users',

            validation: {
                firstname: {
                    required: true
                },
                lastname: {
                    required: true
                },
                email: {
                    required: true,
                    pattern: 'email'
                },
            },

            registrationValidation: {
                password: {
                    required: true
                },
            },

            getFullName: function() {
                return this.get('lastname') + ', ' + this.get('firstname');
            }
        });

        return UserModel;
    });
