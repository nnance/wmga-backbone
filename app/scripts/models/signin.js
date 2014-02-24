/*global define*/

define([
    'underscore',
    'backbone',
    'backbone.validation',
    'appsettings'
    ], function (_, Backbone, BBValidation, AppSettings) {
        'use strict';

        var SignInModel = Backbone.Model.extend({

            idAttribute: '_id',

            dateFormat: AppSettings.dateFormat,

            urlRoot: AppSettings.getBaseURL() + '/rest/signin',

            validation: {
                email: {
                    required: true,
                    pattern: 'email'
                },
                password: {
                    required: true
                }
            },
        });

        return SignInModel;
    });
