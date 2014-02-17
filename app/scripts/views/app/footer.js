/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewbase'
], function ($, _, Backbone, JST, BaseView) {
    'use strict';

    var FooterView = BaseView.extend({
        template: JST['app/scripts/templates/footer.ejs'],
    });

    return FooterView;
});
