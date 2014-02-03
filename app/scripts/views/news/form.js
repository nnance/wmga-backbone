/*global define*/

define([
    'views/formbase',
    'bootstrap.datetimepicker',
    'bootstrap.filestyle',
    'appsettings'
], function (FormBaseView, BSDateTimePicker, BBFileStyle, AppSettings) {
    'use strict';

    var NewsFormView = FormBaseView.extend({
        template: JST['app/scripts/templates/news/form.ejs'],

        events: {
            'click #save-button': 'saveButton',
            'click #cancel-button': 'cancelButton',
            'change #attachedfile': 'prerpareUpload'
        },

        bindings: {
            '#title': 'title',
            '#text': 'text',
            '#itemdate': {
                observe: 'itemdate',
                onGet: 'parseDate',
                onSet: 'convertToDate'
            },
            '#attachedfile': {
                observe: 'attachedfile',
                onSet: 'prerpareUpload'
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
            this.$('#attachedfile').filestyle();
            this.stickit();
            return this;
        },

        saveCompleted: function(model, response, options) {
            this.collection.add(model);
            Backbone.history.navigate('#news', true);
        }
    });

    return NewsFormView;
});
