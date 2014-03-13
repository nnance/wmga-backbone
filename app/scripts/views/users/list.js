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
        addButtonTemplate: JST['app/scripts/templates/users/addbutton.ejs'],

        events: {
            'click #filter': 'switchFilter',
            'keyup input': 'filterUsers'
        },

        renderList: function(filter) {
            this.removeSubViews();
            _.each(this.collection.filter(function(user){
                if (filter) {
                    if (user.getFullName().toLowerCase().indexOf(filter.toLowerCase()) > -1) {
                        return true;
                    } else if (user.get('email').toLowerCase().indexOf(filter.toLowerCase()) > -1) {
                        return true;
                    }
                } else {
                    return true;
                }
            }), this.renderItem, this);
        },

        renderItem: function(model) {
            var view = new ItemView({model: model});
            this.insertView(view.render(),'table');
        },

        filterUsers: function(e) {
            var filter = e.target.value;
            this.renderList(filter);
        }

    });

    return UsersListView;
});
