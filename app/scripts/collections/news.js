/*global define*/

define([
    'underscore',
    'backbone',
    'models/news'
], function (_, Backbone, NewsModel) {
    'use strict';

    var NewsCollection = Backbone.Collection.extend({
        model: NewsModel,

        initialize: function() {
            this.add([
                {
                    "id": "98",
                    "itemdate": "8/24/2013",
                    "title": "2013 Thursday Night League Final Standings",
                    "description": "Final standings are attached and posted at the Golf Shop. Thanks for playing!",
                    "attachedfile": "2013 final standings.pdf",
                    "photo": "0"
                },
                {
                    "id": "92",
                    "itemdate": "5/29/2013",
                    "title": "WMGA - Tornado Relief",
                    "description": "On May 23/24, WMGA Thursday Night League raised $1000 for the Salvation Army Tormado Relief fund. THANK YOU to all who contributed!",
                    "attachedfile": "",
                    "photo": "0"
                }
            ]);
        }
    });

    return NewsCollection;
});
