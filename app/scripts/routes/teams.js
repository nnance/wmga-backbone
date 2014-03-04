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

    });

    return TeamsRouter;
});
