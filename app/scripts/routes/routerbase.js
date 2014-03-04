/*global define*/

define([
    'underscore',
    'backbone',
], function (_, Backbone) {
    'use strict';

    var BaseRouter = Backbone.Router.extend({

        initialize: function(options) {
            this.container = options.container;
            this.dataManager = options.dataManager;
            this.collection = options.collection;
            this.session = options.dataManager.session;
        },

        showView: function(view) {
            var indexView = new this.indexView({view: view});
            this.container.setView(indexView.render());
        },

        showList: function(filter) {
            this.showView(this.createListView(filter));
        },

        createListView: function(filter) {
            return new this.listView({
                collection: this.collection,
                filter: filter,
                session: this.session,
                dataManager: this.dataManager
            })
        },

        showReview: function(id) {
            var model = this.collection.get(id);
            this.showView(this.createReviewView(model));
        },

        createReviewView: function(model) {
            return new this.reviewView({
                model: model,
                session: this.session,
                dataManager: this.dataManager
            })
        },

        showAddForm: function(queryParams) {
            var model = new this.collection.model();
            this.showView(this.createFormView(model, queryParams));
        },

        createFormView: function(model, queryParams) {
            return new this.formView({
                model: model,
                collection: this.collection,
                session: this.session,
                dataManager: this.dataManager,
                queryParams: this.parseQueryString(queryParams)
            });
        },

        showEditForm: function(id) {
            var model = this.collection.get(id);
            this.showView(this.createFormView(model));
        },

        parseQueryString: function( queryString ) {
            var params = {}, queries, temp, i, l;

            // Split into key/value pairs
            if (queryString && queryString.indexOf('?') > -1) {
                queries = queryString.split('?')[1].split('&');

                // Convert the array of strings into an object
                for ( i = 0, l = queries.length; i < l; i++ ) {
                    temp = queries[i].split('=');
                    params[temp[0]] = temp[1];
                }
            }

            return params;
        }
    });

    return BaseRouter;
});
