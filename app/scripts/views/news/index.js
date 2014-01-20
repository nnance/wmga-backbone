/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/news/item',
    'views/news/itemdetail'
], function ($, _, Backbone, JST, ItemView, ItemDetailView) {
    'use strict';

    var NewsIndexView = Backbone.View.extend({
        template: JST['app/scripts/templates/news/index.ejs'],

        initialize: function(options) {
            this.listenTo(this.collection, 'reset', this.renderList);
        },

        render: function() {
            this.$el.html( this.template( this ) );
            this.renderList();
            return this;
        },

        renderList: function() {
            this.removeSubViews();
            this.collection.forEach(function(item){
                var view = new ItemView({model: item});
                this.insertView(view.render(),'#article-list');
                var detailView = new ItemDetailView({model: item});
                this.insertView(detailView.render(),'#article-list');
            }, this);
        }
    });

    return NewsIndexView;
});
