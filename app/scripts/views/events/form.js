/*global define*/

define([
    'views/formbase',
    'bootstrap.datetimepicker',
    'appsettings'
], function (FormBaseView, BSDateTimePicker, AppSettings) {
    'use strict';

    var EventsFormView = FormBaseView.extend({
        template: JST['app/scripts/templates/events/form.ejs'],

        events: {
            'click #save-button': 'saveButton',
            'click #cancel-button': 'cancelButton'
        },

        successRoute: '#events',

        postRender: function() {
            this.$('#startdate').datetimepicker();
            this.$('#enddate').datetimepicker();
            this.filestyle({
                selector: '#attachedfile',
                binding: 'attachedfile',
                classButton: 'btn btn-default'
            });
        },

    });

    return EventsFormView;
});
