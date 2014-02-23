/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewbase'
], function ($, _, Backbone, JST, BaseView) {
        'use strict';

        var ContactView = BaseView.extend({
            template: JST['app/scripts/templates/app/contact.ejs'],

            postRender: function() {
                this.$('#sidebar').affix({
                    offset: {
                        top: this.$('#sidebar').offset().top - 50
                    }
                });
            }
        });

        return ContactView;
    });
