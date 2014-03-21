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
            BaseView.prototype.initialize.apply(this,arguments);
            if (this.model) {
                this.listenTo(this.model,'change',this.render);
            }

        },

        render: function() {
            BaseView.prototype.render.apply(this, arguments);
            if (this.editButtonsTemplate && this.session && this.session.get('admin')) {
                this.$('.btn-toolbar').append(this.editButtonsTemplate(this));
            }
            return this;
        },

        getFileUrl: function() {
            return AppSettings.getBaseURL() + '/files/' + this.model.get('attachedfile');
        },

    });

    return ReviewBaseView;
});
