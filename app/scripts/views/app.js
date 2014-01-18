/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'backbone.viewmanager',
    'views/header',
    'views/container',
    'views/footer',
    'views/home/index',
], function ($, _, Backbone, BBViewManager, HeaderView, ContainterView, FooterView, IndexView) {
    'use strict';

    var AppView = Backbone.View.extend({
        initialize: function() {
            this.header = new HeaderView();
            this.container = new ContainterView();
            this.footer = new FooterView();

            this.index = new IndexView();
        },

        render: function() {
            this.header.render();
            this.container.render();
            this.footer.render();
            this.index.render();

            this.insertView(this.header);
            this.insertView(this.container);
            this.insertView(this.footer);

            this.container.insertView(this.index);
        }
    });

    return AppView;
});
