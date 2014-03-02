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

            this.loaded = false;
            this.listenToOnce(this, 'route', this.loadList);
        },

        loadList: function(route, params) {
            this.collection.fetch()
            .always(_.bind(function(){
                this.loaded = true;
                if (route) {
                    this[route].apply(this,params);
                }
            },this));
        },

        showView: function(view) {
            var indexView = new this.indexView({view: view});
            this.container.setView(indexView.render());
        },

        showList: function(filter) {
            if (this.loaded) {
                this.showView(new this.listView({
                    collection: this.collection,
                    filter: filter,
                    session: this.session
                }));
            }
        },

        showReview: function(id) {
            if (this.loaded) {
                var model = this.collection.get(id);
                this.showView(new this.reviewView({model: model, session: this.session}));
            }
        },

        showAddForm: function() {
            if (this.loaded) {
                this.showView(new this.formView({
                    model: new this.collection.model(),
                    collection: this.collection,
                    session: this.session
                }));
            }
        },

        showEditForm: function(id) {
            if (this.loaded) {
                var model = this.collection.get(id);
                this.showView(new this.formView({
                    model: model,
                    collection: this.collection,
                    session: this.session
                }));
            }
        },
    });

    return BaseRouter;
});
