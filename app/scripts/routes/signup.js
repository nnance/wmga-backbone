/*global define*/

define([
    'jquery',
    'backbone',
    'models/signup',
    'views/signup/typestep',
    'views/signup/emailstep',
    'views/signup/passwordstep',
    'views/signup/createstep',
], function ($, Backbone, SignUpModel, TypeStepView, EmailStepView, PasswordStepView, CreateStepView) {
    'use strict';

    var SignupRouter = Backbone.Router.extend({
        routes: {
            'signup': 'showSignup',
            'signup/:step': 'showSignup'
        },

        initialize: function(options) {
            this.container = options.container;
            this.model = new SignUpModel();
            this.views = {
                welcome: TypeStepView,
                email: EmailStepView,
                password: PasswordStepView,
                create: CreateStepView
            };
        },

        showSignup: function(step) {
            var step = !step ? 'welcome' : step;
            var ViewType = this.views[step];

            if (step !== 'welcome' && !this.model.has('existingMember')) {
                Backbone.history.navigate('#signup', true);
            } else {
                var view = new ViewType({model: this.model});
                this.container.setView(view.render());
            }
        }
    });

    return SignupRouter;
});
