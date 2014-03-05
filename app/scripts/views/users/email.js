/*global define*/

define([
    'views/formbase',
    'bootstrap.datetimepicker',
    'appsettings'
], function (FormBaseView, BSDateTimePicker, AppSettings) {
    'use strict';

    var EmailFormView = FormBaseView.extend({
        template: JST['app/scripts/templates/users/email.ejs'],

        events: {
            'click #save-button': 'saveButton',
            'click #cancel-button': 'cancelButton',
        },

        routeSuccessfulResult: function() {
            Backbone.history.navigate('#users', true);
        }
    });

    return EmailFormView;
});
