/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/listbase',
    'moment',
    'views/teams/listitem'
], function ($, _, Backbone, JST, ListBaseView, Moment, ItemView) {
    'use strict';

    var TeamsListView = ListBaseView.extend({
        template: JST['app/scripts/templates/teams/list.ejs'],
        // addButtonTemplate: JST['app/scripts/templates/teams/addbutton.ejs'],

        events: {
            'click #filter': 'switchFilter',
            'keyup input': 'filterTeams'
        },

        renderList: function(filter) {
            this.removeSubViews();
            _.each(this.collection.filter(function(team){
                if (filter) {
                    return team.get('name').toLowerCase().indexOf(filter.toLowerCase()) > -1;
                } else {
                    return true;
                }
            }), this.renderItem, this);
        },

        renderItem: function(model) {
            var view = new ItemView({model: model});
            this.insertView(view.render(),'table');
        },

        filterTeams: function() {
            var filter = event.target.value;
            this.renderList(filter);
        }

    });

    return TeamsListView;
});