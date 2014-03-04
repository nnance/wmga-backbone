define([
    'underscore',
    'backbone',
    'collections/events',
    'collections/news',
    'collections/results',
    'collections/user',
    'collections/team'
], function (_, Backbone, Events, News, Results, Users, Teams) {
    'use strict';

    var DataManager = function (options) {
        this.initialize.apply(this,arguments);
    };

    _.extend(DataManager.prototype, Backbone.Events, {
        initialize: function(options) {
            if (!options || !options.session) {
                throw new Error('missing session option');
            }
            this.session = options.session;

            this.eventsCollection = new Events();
            this.newsCollection = new News();
            this.resultsCollection = new Results();
            this.userCollection = new Users();
            this.teamCollection = new Teams();

            this.listenTo(this.session, 'change:signedIn', this.loadSecureData);
        },

        loadSecureData: function(model,value,options) {
            if (value) {
                this.userCollection.fetch();
                this.teamCollection.fetch();
            }
        }
    });

    return DataManager;
});
