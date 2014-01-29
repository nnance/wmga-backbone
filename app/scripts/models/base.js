/*global define*/

define([
    'underscore',
    'backbone',
    'backbone.validation',
    'moment',
    'appsettings'
    ], function (_, Backbone, BBValidation, Moment, AppSettings) {
        'use strict';

        var BaseModel = Backbone.Model.extend({

            idAttribute: '_id',

            dateAsString: function(attribute) {
                return this.formatDate(this.get(attribute));
            },

            formatDate: function(value) {
                return moment(value).format(AppSettings.dateFormat);
            },

            setAsDate: function(attribute, value) {
                return this.set(attribute, this.stringToDate(value));
            },

            stringToDate: function(value) {
                return moment(value);
            },

            now: function() {
                return moment();
            }
        });

        return BaseModel;
    });
