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

        bindings: {
            '#title': 'title',
            '#description': 'description',
            '#startdate': {
                observe: 'startdate',
                onGet: 'parseDate',
                onSet: 'convertToDate'
            },
            '#enddate': {
                observe: 'enddate',
                onGet: 'parseDate',
                onSet: 'convertToDate'
            }
        },

        initialize: function() {
            Backbone.Validation.bind(this);
            this.listenTo(this.model, 'validated:invalid', this.handleErrors);
            this.listenTo(this.model, 'sync', this.saveCompleted);
            this.listenTo(this.model, 'error', this.saveFailed);
        },

        render: function() {
            this.$el.html( this.template( this ) );
            this.$('#startdate').datetimepicker();
            this.$('#enddate').datetimepicker();
            this.filestyle({
                selector: '#attachedfile',
                binding: 'attachedfile',
                classButton: 'btn btn-default'
            });
            this.stickit();
            return this;
        },

        saveCompleted: function(model, response, options) {
            this.collection.add(model);
            Backbone.history.navigate('#events', true);
        }

    });

    return EventsFormView;
});
