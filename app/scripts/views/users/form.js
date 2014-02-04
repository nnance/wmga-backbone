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

        bindings: {
            '#username': 'username',
            '#email': 'email',
            '#firstname': 'firstname',
            '#lastname': 'lastname',
            '#address': 'address',
            '#address2': 'address2',
            '#phone': 'phone',
            '#altphone': 'altphone',
            '#birthdate': {
                observe: 'birthdate',
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
            this.$('#birthdatepicker').datetimepicker({
                pickTime: false
            });
            this.filestyle({
                selector: '#picture',
                binding: 'picture',
                classButton: 'btn btn-default'
            });
            this.stickit();
            return this;
        },

        saveCompleted: function(model, response, options) {
            this.collection.add(model);
            Backbone.history.navigate('#users', true);
        }
    });

    return UsersFormView;
});
