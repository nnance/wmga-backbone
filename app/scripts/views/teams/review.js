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

    var TeamsDetailView = ReviewBaseView.extend({
        template: JST['app/scripts/templates/teams/review.ejs'],
        editButtonsTemplate: JST['app/scripts/templates/teams/editbuttons.ejs'],
        adminTemplate: JST['app/scripts/templates/teams/reviewadmin.ejs'],
        treasureTemplate: JST['app/scripts/templates/teams/reviewtreasure.ejs'],

        events: {
            'click #delete-btn': 'showDeleteConfirm',
            'click #admin': 'setAdmin',
            'click #treasure': 'setTreasure',
            'click #team-btn': 'registerTeam'
        },

        initialize: function(options){
            ReviewBaseView.prototype.initialize.apply(this,arguments);
            this.userCollection = options.dataManager.userCollection;
        },

        render: function() {
            BaseView.prototype.render.apply(this, arguments);

            var isSignedUser = this.session.get('userid') === this.model.get('captainid');
            var isAdmin = this.session.get('admin');

            if (isAdmin || isSignedUser) {
                this.$('.btn-toolbar').append(this.editButtonsTemplate(this));
            }

            if (this.model.get('paid') || !isSignedUser) {
                this.$('#team-unpaid').remove();
            } else {
                this.$('#team-paid').remove();
            }

            _.each(this.model.get('members'), function(memberid){
                var user = this.userCollection.get(memberid);
                if (user) {
                    this.$('#team-table').append('<p>' + user.getFullName() + '</p>');
                }
            }, this);
            return this;
        },

        getFileUrl: function() {
            return AppSettings.getBaseURL() + '/files/' + this.model.get('photo');
        },

        getPayNow: function() {
            return AppSettings.teamPayNow + this.model.id;
        },

        getCaptainName: function() {
            if (this.model.has('captainid')) {
                var user = this.userCollection.get(this.model.get('captainid'));
                return _.isObject(user) ? user.getFullName() : '';
            }
        },

        showDeleteConfirm: function() {
            var view = new DeleteView({
                model: this.model,
                modelAttr: 'name',
                modelTypeName: 'team',
                successRoute: '#teams'
            });
            this.$el.append(view.render().el);
            view.show();
        }
    });

    return TeamsDetailView;
});
