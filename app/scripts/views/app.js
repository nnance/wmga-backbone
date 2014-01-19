/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.viewmanager',
    'routes/router',
    'views/header',
    'views/container',
    'views/footer',
    'views/home/index',
], function ($, _, Backbone, BBViewManager, Router, HeaderView, ContainterView, FooterView, IndexView) {
    'use strict';

    var AppView = Backbone.View.extend({
        initialize: function() {

            this.container = new ContainterView();
            this.router = new Router({container: this.container});
            this.header = new HeaderView({router: this.router});
            this.footer = new FooterView();

        },

        render: function() {
            this.header.render();
            this.container.render();
            this.footer.render();

            this.insertView(this.header);
            this.insertView(this.container);
            this.insertView(this.footer);
        }
    });

    return AppView;
});
