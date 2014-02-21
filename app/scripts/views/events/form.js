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

        render: function() {
            FormBaseView.prototype.render.apply(this,arguments);

            this.$('#startdatepicker').datetimepicker();
            this.$('#enddatepicker').datetimepicker();
            this.filestyle({
                selector: '#attachedfile',
                binding: 'attachedfile',
                classButton: 'btn btn-default'
            });

            return this;
        },

        routeSuccessfulResult: function() {
            Backbone.history.navigate('#events', true);
        }
    });

    return EventsFormView;
});
