/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/listbase',
    'moment',
    'views/users/listitem'
], function ($, _, Backbone, JST, ListBaseView, Moment, ItemView) {
    'use strict';

    var UsersListView = ListBaseView.extend({
        template: JST['app/scripts/templates/users/list.ejs'],

        events: {
            'click #filter': 'switchFilter'
        },

        renderItem: function(model) {
            var view = new ItemView({model: model});
            this.insertView(view.render(),'table');
        },

        switchFilter: function() {
            Backbone.history.navigate('#users/filter/' + event.target.id, true);
        }
    });

    return UsersListView;
});
