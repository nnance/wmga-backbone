/*global define*/

define([
    'views/formbase',
    'bootstrap.datetimepicker',
    'appsettings'
], function (FormBaseView, BSDateTimePicker, AppSettings) {
    'use strict';

    var ResultsFormView = FormBaseView.extend({
        template: JST['app/scripts/templates/results/form.ejs'],

        events: {
            'click #save-button': 'saveButton',
            'click #cancel-button': 'cancelButton',
        },

        bindings: {
            '#title': 'title',
            '#text': 'text',
            '#itemdate': {
                observe: 'itemdate',
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
            this.$('#itemdatepicker').datetimepicker({
                pickTime: false
            });
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
            Backbone.history.navigate('#results', true);
        }
    });

    return ResultsFormView;
});
