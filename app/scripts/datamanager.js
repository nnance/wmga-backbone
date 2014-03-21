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
            var deferreds = [
                this.eventsCollection.fetch(),
                this.newsCollection.fetch(),
                this.resultsCollection.fetch()
            ]
            if (this.session.get('signedin')) {
                deferreds.push(this.userCollection.fetch());
                deferreds.push(this.teamCollection.fetch());
            }
            $.when.apply($,deferreds).done(callback);
            return deferreds;
        },

        loadSecureData: function(callback) {
            var deferreds = [
                this.userCollection.fetch(),
                this.teamCollection.fetch()
            ];
            $.when.apply($,deferreds).done(callback);
            return deferreds;
        }
    });

    return DataManager;
});
