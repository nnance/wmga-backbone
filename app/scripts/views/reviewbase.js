/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewbase',
    'appsettings',
    'views/delete'
], function ($, _, Backbone, JST, BaseView, AppSettings, DeleteView) {
    'use strict';

    var ReviewBaseView = BaseView.extend({

        initialize: function(options) {
            BaseView.prototype.initialize.apply(this, arguments);
            if (options && options.session) {
                this.session = options.session;
            }
        },

        render: function(options) {
            BaseView.prototype.render.apply(this, arguments);
            if (this.editButtonsTemplate && this.session && this.session.get('admin')) {
                this.$('.btn-toolbar').append(this.editButtonsTemplate(this));
            }
            return this;
        },

        getFileUrl: function() {
            return AppSettings.getBaseURL() + '/attachments/' + this.model.get('attachedfile');
        },

    });

    return ReviewBaseView;
});
