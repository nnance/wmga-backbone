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

        events: {
            'click #delete-btn': 'showDeleteConfirm',
            'click #mark-paid': 'setPaid',
            'click #admin': 'setAdmin',
            'click #treasure': 'setTreasure',
            'click #team-btn': 'registerTeam',
            'click #team-btn-edit': 'manageTeam'
        },

        initialize: function(options) {
            ReviewBaseView.prototype.initialize.apply(this, arguments);
            this.teamCollection = options.dataManager.teamCollection;
        },

        render: function() {
            ReviewBaseView.prototype.render.apply(this, arguments);

            var isSignedUser = this.session.get('userid') === this.model.id;

            if (isSignedUser && !this.session.get('admin')) {
                this.$('.btn-toolbar').append(this.editButtonsTemplate(this));
            }
            if (this.session.get('email') !== 'nance.nick@gmail.com') {
                this.$('#admin').parent().remove();
                this.$('#treasure').parent().remove();
            }

            if (!this.session.get('treasure')) {
                this.$('#mark-paid').parent().remove();
            }

            if (this.model.get('paid') || !isSignedUser) {
                this.$('#member-unpaid').remove();
            }

            if (!this.model.has('teamid') || (this.model.get('teamid').length === 0)) {
                this.$('#team-btn-edit').remove();
            } else {
                this.$('#team-btn').remove();

                var team = this.teamCollection.get(this.model.get('teamid'));
                if (!team || (this.session.get('userid') !== team.get('captainid'))) {
                    this.$('#team-btn-edit').remove();
                }
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

        setPaid: function() {
            event.preventDefault();
            this.model.save({paid: event.target.checked});
        },

        setAdmin: function() {
            event.preventDefault();
            this.model.save({admin: event.target.checked});
        },

        setTreasure: function() {
            event.preventDefault();
            this.model.save({treasure: event.target.checked});
        },

        registerTeam: function() {
            event.preventDefault();
            Backbone.history.navigate('#teams/create',true);
        },

        manageTeam: function() {
            event.preventDefault();
            Backbone.history.navigate('#teams/read/' + this.model.get('teamid'),true);
        }
    });

    return UsersDetailView;
});
