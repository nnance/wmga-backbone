define([], function () {
    'use strict';

    var AppSettings = {
  		getBaseURL: function() {
            if (window.location.hostname === 'localhost') {
                return 'http://localhost:3000';
            } else {
                return '';
            }
        },
        dateFormat: 'MM/DD/YYYY'
    };

    return AppSettings;
});
