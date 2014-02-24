/*global define*/

define([
    'routes/routerbase',
    'collections/news',
    'views/news/index',
    'views/news/list',
    'views/news/review',
    'views/news/form',
], function (BaseRouter, NewsCollection, IndexView, ListView, ReviewView, FormView) {
    'use strict';

    var NewsRouter = BaseRouter.extend({
        routes: {
            'news': 'showList',
            'news/create': 'showAddForm',
            'news/read/:id': 'showReview',
            'news/update/:id': 'showEditForm',
            'news/filter/:value': 'showList'
        },
        collectionType: NewsCollection,
        indexView: IndexView,
        listView: ListView,
        reviewView: ReviewView,
        formView: FormView
    });

    return NewsRouter;
});
