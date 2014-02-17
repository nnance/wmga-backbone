/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/viewbase'
], function ($, _, Backbone, BaseView) {
    'use strict';

    var ListitemBaseView = BaseView.extend({

        initialize: function(options) {
            BaseView.prototype.initialize.apply(this,arguments);
            if (this.model) {
                this.listenTo(this.model, 'change', this.render);
            }
        },
    });

    return ListitemBaseView;
});
