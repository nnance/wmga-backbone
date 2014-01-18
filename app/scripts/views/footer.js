/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var FooterView = Backbone.View.extend({
        className: 'footer container',

        template: JST['app/scripts/templates/footer.ejs'],

        render: function() {
            this.$el.html( this.template( this ) );
            return this;
        },
    });

    return FooterView;
});
