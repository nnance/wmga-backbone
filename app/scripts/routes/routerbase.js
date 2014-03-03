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
                this.showView(this.createListView(filter));
            }
        },

        createListView: function(filter) {
            return new this.listView({
                collection: this.collection,
                filter: filter,
                session: this.session
            })
        },

        showReview: function(id) {
            if (this.loaded) {
                var model = this.collection.get(id);
                this.showView(this.createReviewView(model));
            }
        },

        createReviewView: function(model) {
            return new this.reviewView({
                model: model,
                session: this.session
            })
        },

        showAddForm: function(queryParams) {
            if (this.loaded) {
                var model = new this.collection.model();
                this.showView(this.createFormView(model, queryParams));
            }
        },

        createFormView: function(model, queryParams) {
            return new this.formView({
                model: model,
                collection: this.collection,
                session: this.session,
                queryParams: this.parseQueryString(queryParams)
            });
        },

        showEditForm: function(id) {
            if (this.loaded) {
                var model = this.collection.get(id);
                this.showView(this.createFormView(model));
            }
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
