/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/formbase'
], function ($, _, Backbone, JST, BaseFormView) {
    'use strict';

    var TypeStepView = BaseFormView.extend({
        template: JST['app/scripts/templates/signup/emailstep.ejs'],

        events: {
            'click .btn': 'nextStep'
        },

        nextStep: function(events) {
            events.preventDefault();
            this.model.set(this.serializeForm('form'));
            Backbone.history.navigate('#signup/step/3', true);
        }
    });

    return TypeStepView;
});
