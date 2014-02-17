/*global define*/

define([
    'views/formbase',
    'bootstrap.datetimepicker',
    'appsettings'
], function (FormBaseView, BSDateTimePicker, AppSettings) {
    'use strict';

    var NewsFormView = FormBaseView.extend({
        template: JST['app/scripts/templates/news/form.ejs'],

        events: {
            'click #save-button': 'saveButton',
            'click #cancel-button': 'cancelButton',
        },

        render: function() {
            FormBaseView.prototype.render.apply(this,arguments);

            this.$('#itemdatepicker').datetimepicker({
                pickTime: false
            });
            this.filestyle({
                selector: '#attachedfile',
                binding: 'attachedfile',
                classButton: 'btn btn-default'
            });
            return this;
        },

        routeSuccessfulResult: function() {
            Backbone.history.navigate('#news', true);
        }
    });

    return NewsFormView;
});
