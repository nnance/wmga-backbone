/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'appsettings',
    'views/viewbase'
], function ($, _, Backbone, JST, AppSettings, BaseView) {
    'use strict';

    var PayNowStep = BaseView.extend({
        template: JST['app/scripts/templates/signup/paynowcreatedstep.ejs'],

        events: {
            'click .btn-primary': 'nextStep',
            'click .btn-default': 'skipStep'
        },

        nextStep: function(e) {
            e.preventDefault();
            window.location.href = AppSettings.membershipPayNow + this.model.get('email');
        },

        skipStep: function(e) {
            e.preventDefault();
            Backbone.history.navigate('#membership', true);
        },
    });

    return PayNowStep;
});
