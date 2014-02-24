/*global define*/

define([
    'jquery',
    'backbone',
    'views/signup/typestep',
    'views/signup/emailstep',
    'views/signup/passwordstep'
], function ($, Backbone, TypeStepView, EmailStep, PasswordStep) {
    'use strict';

    var SignupRouter = Backbone.Router.extend({
        routes: {
            'signup': 'showSignup',
            'signup/step/:id': 'showSignup'
        },

        initialize: function(options) {
            this.container = options.container;
            this.model = new Backbone.Model();
            this.views = [TypeStepView, EmailStep, PasswordStep];
        },

        showSignup: function(step) {
            var step = !step ? 1 : step;
            var ViewType = this.views[step-1];

            if (step > 1 && !this.model.has('existingMember')) {
                Backbone.history.navigate('#signup', true);
            } else {
                var view = new ViewType({model: this.model});
                this.container.setView(view.render());
            }
        }
    });

    return SignupRouter;
});
