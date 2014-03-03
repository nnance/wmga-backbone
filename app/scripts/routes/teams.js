/*global define*/

define([
    'routes/routerbase',
    'collections/team',
    'collections/user',
    'views/teams/index',
    'views/teams/list',
    'views/teams/review',
    'views/teams/form',
], function (BaseRouter, TeamCollection, UserCollection, IndexView, ListView, ReviewView, FormView) {
    'use strict';

    var TeamsRouter = BaseRouter.extend({
        routes: {
            'teams': 'showList',
            'teams/create(:return)': 'showAddForm',
            'teams/read/:id': 'showReview',
            'teams/update/:id': 'showEditForm',
        },
        collectionType: TeamCollection,
        indexView: IndexView,
        listView: ListView,
        reviewView: ReviewView,
        formView: FormView,

        initialize: function() {
            BaseRouter.prototype.initialize.apply(this,arguments);
            this.userCollection = new UserCollection();
        },

        loadList: function(route, params) {
            var colReq = this.collection.fetch();
            var userReq = this.userCollection.fetch();

            $.when(colReq, userReq).done(_.bind(function(){
                this.loaded = true;
                if (route) {
                    this[route].apply(this,params);
                }
            },this));
        },

        createReviewView: function(model) {
            return new this.reviewView({
                model: model,
                userCollection: this.userCollection,
                session: this.session
            })
        },

        createFormView: function(model, queryParams) {
            return new this.formView({
                model: model,
                collection: this.collection,
                userCollection: this.userCollection,
                session: this.session,
                queryParams: this.parseQueryString(queryParams)
            });
        },


    });

    return TeamsRouter;
});
