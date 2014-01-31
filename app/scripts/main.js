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
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        'backbone.localstorage': '../bower_components/backbone.localstorage/backbone.localstorage',
        'backbone.stickit': '../bower_components/backbone.stickit/backbone.stickit',
        'backbone.viewmanager': '../bower_components/backbone.viewmanager/backbone.viewmanager',
        'backbone.validation': '../bower_components/backbone.validation/src/backbone-validation',
        moment: '../bower_components/moment/moment',
        'bootstrap.datetimepicker': '../bower_components/bootstrap3-datetimepicker/src/js/bootstrap-datetimepicker',
        'bootstrap.filestyle': '../bower_components/bootstrap-filestyle/src/bootstrap-filestyle',
        select2: '../bower_components/select2/select2'
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
