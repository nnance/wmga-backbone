/*global define*/

define([
    'underscore',
    'backbone',
    'backbone.validation',
    'appsettings'
    ], function (_, Backbone, BBValidation, AppSettings) {
        'use strict';

        var EmailModel = Backbone.Model.extend({

            idAttribute: '_id',

            urlRoot: AppSettings.getBaseURL() + '/rest/users/email',

            validation: {
                subject: {
                    required: true
                },
                body: {
                    required: true
                }
            },
        });

        return EmailModel;
    });
