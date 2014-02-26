/*global define*/

define([
    'jquery',
    'backbone',
], function ($, Backbone) {
    'use strict';

    var BaseRouter = Backbone.Router.extend({

        initialize: function(options) {
            this.session = options.session;
            this.container = options.container;
            this.collection = new this.collectionType();
            this.listenToOnce(this, 'route', this.loadList);
        },

        loadList: function(route, params) {
            this.collection.fetch();
        },

        showView: function(view) {
            var indexView = new this.indexView({view: view});
            this.container.setView(indexView.render());
        },

        showList: function(filter) {
            this.showView(new this.listView({
                collection: this.collection,
                filter: filter,
                session: this.session
            }));
        },

        showReview: function(id) {
            var model = this.collection.get(id);
            if (model) {
                this.showView(new this.reviewView({model: model, session: this.session}));
            } else {
                this.listenToOnce(this.collection, 'sync', _.bind(function(){
                    this.showReview(id);
                },this))
            }
        },

        showAddForm: function() {
            this.showView(new this.formView({
                model: new this.collection.model(),
                collection: this.collection,
                session: this.session
            }));
        },

        showEditForm: function(id) {
            var model = this.collection.get(id);
            if (model) {
                this.showView(new this.formView({
                    model: model,
                    collection: this.collection,
                    session: this.session
                }));
            } else {
                this.listenToOnce(this.collection, 'sync', _.bind(function(){
                    this.showEditForm(id);
                },this))
            }
        },
    });

    return BaseRouter;
});
