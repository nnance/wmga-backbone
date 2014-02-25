/*global define*/

define([
    'jquery',
    'backbone',
    'models/signup',
    'views/signup/index',
    'views/signup/typestep',
    'views/signup/emailstep',
    'views/signup/passwordstep',
    'views/signup/createstep',
], function ($, Backbone, SignUpModel, IndexView, TypeStepView, EmailStepView, PasswordStepView, CreateStepView) {
    'use strict';

    var SignupRouter = Backbone.Router.extend({
        routes: {
            'signup': 'showSignup',
            'signup/:step': 'showSignup'
        },

        initialize: function(options) {
            this.container = options.container;
            this.session = options.session;

            this.model = new SignUpModel();
            this.indexView = new IndexView();
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
                if (step === 'welcome') {
                    this.container.setView(this.indexView.render());
                }
                var view = new ViewType({model: this.model, session: this.session});
                this.indexView.removeSubViews();
                this.indexView.insertView(view.render(),'#stepContent');
            }
        }
    });

    return SignupRouter;
});
