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
    }
});

require([
    'backbone',
    'views/app'
], function (Backbone, App) {
    var app = new App({el: '#app'});
    app.render();

    Backbone.history.start();
});
