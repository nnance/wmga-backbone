/*global define*/

define([
    'underscore',
    'backbone',
    'backbone.validation',
    'appsettings'
    ], function (_, Backbone, BBValidation, AppSettings) {
        'use strict';

        var RequestPasswordModel = Backbone.Model.extend({

            idAttribute: '_id',

            urlRoot: AppSettings.getBaseURL() + '/rest/users/requestpassword',

            validation: {
                email: {
                    required: true
                },
            },
        });

        return RequestPasswordModel;
    });
