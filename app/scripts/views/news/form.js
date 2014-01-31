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

        prerpareUpload: function(event) {
            this.files = event.target.files;
        },

        saveButton: function() {
            this.removeSubViews();
            if (this.model.isValid(true)) {
                this.uploadFiles();
            }
        },

        uploadFiles: function() {
            var data = new FormData();
            $.each(this.files, function(key, value) {
                data.append(key, value);
            });

            $.ajax({
                url: AppSettings.baseURL + '/rest/attachments',
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: false, // Don't process the files
                contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                success: _.bind(function(data, textStatus, jqXHR) {
                    this.model.set('attachedfile',data.fileName);
                    this.model.save();
                }, this),
                error: _.bind(function(jqXHR, textStatus, errorThrown) {
                    alert('ERRORS: ' + textStatus);
                }, this)
            });
        },

        saveCompleted: function(model, response, options) {
            this.collection.add(model);
            Backbone.history.navigate('#news', true);
        }
    });

    return NewsFormView;
});
