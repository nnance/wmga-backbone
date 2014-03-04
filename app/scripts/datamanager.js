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

            // this.listenTo(this.session, 'change:signedIn', this.loadSecureData);
        },

        loadData: function(callback) {
            var options = {
                success: _.bind(this.loadCompleted,this),
                failure: _.bind(this.loadCompleted,this)
            };
            var deferreds = [
                this.eventsCollection.fetch(options),
                this.newsCollection.fetch(options),
                this.resultsCollection.fetch(options)
            ]
            if (this.session.get('signedIn')) {
                deferreds.push(this.userCollection.fetch(options));
                deferreds.push(this.teamCollection.fetch(options));
            }
            this.loadCount = deferreds.length;
            this.loadCallback = callback;
            return deferreds;
        },

        loadCompleted: function() {
            this.loadCount = this.loadCount - 1;
            if (this.loadCount === 0) this.loadCallback.call(this);
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