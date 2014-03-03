/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewbase',
    'views/reviewbase',
    'appsettings',
    'views/delete'
], function ($, _, Backbone, JST, BaseView, ReviewBaseView, AppSettings, DeleteView) {
    'use strict';

    var UsersDetailView = ReviewBaseView.extend({
        template: JST['app/scripts/templates/users/review.ejs'],
        editButtonsTemplate: JST['app/scripts/templates/users/editbuttons.ejs'],
        adminTemplate: JST['app/scripts/templates/users/reviewadmin.ejs'],
        treasureTemplate: JST['app/scripts/templates/users/reviewtreasure.ejs'],

        events: {
            'click #delete-btn': 'showDeleteConfirm',
            'click #admin': 'setAdmin',
            'click #treasure': 'setTreasure',
            'click #team-btn': 'registerTeam'
        },

        initialize: function(options) {
            ReviewBaseView.prototype.initialize.apply(this, arguments);
            this.teamCollection = options.teamCollection;
        },

        render: function() {
            ReviewBaseView.prototype.render.apply(this, arguments);

            var isSignedUser = this.session.get('userid') === this.model.id;
            var isAdmin = this.session.get('admin');

            if (isAdmin || isSignedUser) {
                this.$('.btn-toolbar').append(this.editButtonsTemplate(this));
            }
            if (this.session.get('email') === 'nance.nick@gmail.com') {
                this.$('#info').append(this.adminTemplate(this)).
                append(this.treasureTemplate(this));
            }

            if (this.model.get('paid') || !isSignedUser) {
                this.$('#member-unpaid').remove();
            }

            if (!this.model.has('teamid') || (this.model.get('teamid').length === 0)) {
                this.$('#team-btn-edit').remove();
            } else {
                this.$('#team-btn').remove();
            }
            return this;
        },

        getFileUrl: function() {
            return AppSettings.getBaseURL() + '/attachments/' + this.model.get('photo');
        },

        getPayNow: function() {
            return AppSettings.membershipPayNow + this.model.get('email');
        },

        showDeleteConfirm: function() {
            var view = new DeleteView({
                model: this.model,
                modelAttr: 'username',
                modelTypeName: 'user',
                successRoute: '#users'
            });
            this.$el.append(view.render().el);
            view.show();
        },

        setAdmin: function() {
            event.preventDefault();
            this.model.save({admin: event.target.checked});
            if (this.session.get('userid') === this.model.id) {
                this.session.signin(this.model);
            }
        },

        setTreasure: function() {
            event.preventDefault();
            this.model.save({treasure: event.target.checked});
            if (this.session.get('userid') === this.model.id) {
                this.session.signin(this.model);
            }
        },

        registerTeam: function() {
            event.preventDefault();
            Backbone.history.navigate('#teams/create',true);
        }
    });

    return UsersDetailView;
});
