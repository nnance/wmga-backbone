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
        },

        render: function() {
            BaseView.prototype.render.apply(this, arguments);

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
                this.$('#notPaid').remove();
            }
            return this;
        },

        getFileUrl: function() {
            return AppSettings.getBaseURL() + '/attachments/' + this.model.get('attachedfile');
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

        setAdmin: function(events) {
            this.model.save({admin: events.target.checked});
            if (this.session && (this.session.get('userid') === this.model.id)) {
                this.session.signin(this.model);
            }
        },

        setTreasure: function(events) {
            this.model.save({treasure: events.target.checked});
            if (this.session && (this.session.get('userid') === this.model.id)) {
                this.session.signin(this.model);
            }
        }
    });

    return UsersDetailView;
});
