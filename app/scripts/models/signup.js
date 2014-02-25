/*global define*/

define([
    'underscore',
    'backbone',
    'backbone.validation',
    'appsettings'
    ], function (_, Backbone, BBValidation, AppSettings) {
        'use strict';

        var SignUpModel = Backbone.Model.extend({

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
                password: {
                    required: true
                },
            },
        });

        return SignUpModel;
    });
