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
        'jquery.ui/jquery.ui.core': {
            deps: ['jquery']
        },
        'jquery.ui/jquery.ui.widget': {
            deps: ['jquery.ui/jquery.ui.core']
        },
        'jquery.ui/jquery.ui.button': {
            deps: ['jquery.ui/jquery.ui.widget']
        },
        'jquery.ui/jquery.ui.datepicker': {
            deps: ['jquery.ui/jquery.ui.button']
        },
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        'jquery.ui': '../bower_components/jquery.ui/ui',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        'backbone.localstorage': '../bower_components/backbone.localstorage/backbone.localstorage',
        'backbone.stickit': '../bower_components/backbone.stickit/backbone.stickit',
        'backbone.viewmanager': '../bower_components/backbone.viewmanager/backbone.viewmanager',
        'backbone.validation': '../bower_components/backbone.validation/src/backbone-validation',
        moment: '../bower_components/moment/moment'
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
