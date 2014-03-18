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
        template: JST['app/scripts/templates/app/footer.ejs'],
        className: 'container'
    });

    return FooterView;
});
