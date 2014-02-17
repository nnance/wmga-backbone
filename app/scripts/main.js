/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        'bootstrap.datetimepicker': {
            deps: [
                'jquery',
                'moment'
            ]
        },
        select2: {
            deps: ['jquery']
        },
        'backbone.validation': {
            deps: ['backbone']
        },
        'bootstrap-filestyle': {
            deps: ['jquery']
        },
        'backbone.viewmanager': {
            deps: ['backbone']
        },
        'backbone.datetime': {
            deps: [
                'backbone',
                'moment'
            ]
        },
        'backbone.filestyle': {
            deps: [
                'backbone',
                'bootstrap-filestyle'
            ]
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        'backbone.localstorage': '../bower_components/backbone.localstorage/backbone.localstorage',
        'backbone.validation': '../bower_components/backbone.validation/src/backbone-validation',
        moment: '../bower_components/moment/moment',
        'bootstrap.datetimepicker': '../bower_components/bootstrap3-datetimepicker/src/js/bootstrap-datetimepicker',
        'bootstrap-filestyle': '../bower_components/bootstrap-filestyle/src/bootstrap-filestyle',
        select2: '../bower_components/select2/select2',
        'backbone.viewmanager': '../bower_components/backbone-plugins/viewmanager/backbone.viewmanager',
        'backbone.datetime': '../bower_components/backbone-plugins/modeldatetime/backbone.datetime',
        'backbone.filestyle': '../bower_components/backbone-plugins/filestyle/backbone.filestyle',
    }
});

require([
    'backbone',
    'views/app'
], function (Backbone, App) {
    var app = new App({el: '#app'});
    app.render();
    app.initSession();
});
