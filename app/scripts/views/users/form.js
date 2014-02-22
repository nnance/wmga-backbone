/*global define*/

define([
    'views/formbase',
    'bootstrap.datetimepicker',
    'appsettings'
], function (FormBaseView, BSDateTimePicker, AppSettings) {
    'use strict';

    var UsersFormView = FormBaseView.extend({
        template: JST['app/scripts/templates/users/form.ejs'],

        events: {
            'click #save-button': 'saveButton',
            'click #cancel-button': 'cancelButton',
        },

        render: function() {
            FormBaseView.prototype.render.apply(this,arguments);

            this.$('#birthdatepicker').datetimepicker({
                pickTime: false
            });
            this.filestyle({
                selector: '#picture',
                binding: 'picture',
                classButton: 'btn btn-default'
            });
            return this;
        },

        routeSuccessfulResult: function() {
            Backbone.history.navigate('#users', true);
        }
    });

    return UsersFormView;
});
