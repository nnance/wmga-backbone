/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
    ], function ($, _, Backbone, JST) {
        'use strict';

        var ContactView = Backbone.View.extend({
            template: JST['app/scripts/templates/contact.ejs'],

            render: function() {
                this.$el.html( this.template( this ) );
                return this;
            },

            postRender: function() {
                this.$('#sidebar').affix({
                    offset: {
                        top: this.$('#sidebar').offset().top - 25
                    }
                });
            }
        });

        return ContactView;
    });
