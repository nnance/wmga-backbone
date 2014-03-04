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
            if (this.session.get('signedin')) {
                deferreds.push(this.userCollection.fetch(options));
                deferreds.push(this.teamCollection.fetch(options));
            }
            this.initiateLoad(deferreds, callback);
            return deferreds;
        },

        initiateLoad: function(deferreds, callback) {
            this.loadCount = deferreds.length;
            this.loadCallback = callback;
        },

        loadCompleted: function() {
            this.loadCount = this.loadCount - 1;
            if (this.loadCount === 0) {
                this.loadCallback.call(this);
            }
        },

        loadSecureData: function(callback) {
            var deferreds = [
                this.userCollection.fetch(),
                this.teamCollection.fetch()
            ];
            this.initiateLoad(deferreds, callback);
            return deferreds;
        }
    });

    return DataManager;
});
