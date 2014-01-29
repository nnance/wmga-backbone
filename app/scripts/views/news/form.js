/*global define*/

define([
    'views/formbase',
    'jquery.ui/jquery.ui.datepicker',
], function (FormBaseView, JQDatePicker) {
    'use strict';

    var NewsFormView = FormBaseView.extend({
        template: JST['app/scripts/templates/news/form.ejs'],

        events: {
            'click #save-button': 'saveButton',
            'click #cancel-button': 'cancelButton'
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
            this.$('#itemdate').datepicker();
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
