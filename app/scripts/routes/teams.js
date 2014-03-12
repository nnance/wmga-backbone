/*global define*/

define([
    'routes/routerbase',
    'views/teams/index',
    'views/teams/list',
    'views/teams/review',
    'views/teams/form',
], function (BaseRouter, IndexView, ListView, ReviewView, FormView) {
    'use strict';

    var TeamsRouter = BaseRouter.extend({
        routes: {
            'teams': 'showList',
            'teams/create(:return)': 'showAddForm',
            'teams/read/:id': 'showReview',
            'teams/update/:id': 'showEditForm',
        },
        indexView: IndexView,
        listView: ListView,
        reviewView: ReviewView,
        formView: FormView,

        showList: function(filter) {
            var view = this.createListView(filter);
            var indexView = new this.indexView({view: view});
            indexView.render();
            indexView.$('#help').remove();
            indexView.$('#index').removeClass('col-md-9').addClass('col-md-12');
            this.container.setView(indexView);
        }

    });

    return TeamsRouter;
});
