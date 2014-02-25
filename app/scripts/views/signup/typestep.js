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
        template: JST['app/scripts/templates/signup/typestep.ejs'],

        events: {
            'click .btn': 'nextStep'
        },

        nextStep: function(events) {
            events.preventDefault();
            this.model.set(this.serializeForm('form'));
            if (this.model.get('existingMember') === 'yes') {
                Backbone.history.navigate('#signup/email', true);
            } else {
                Backbone.history.navigate('#signup/create', true);
            }
        }

    });

    return TypeStepView;
});
