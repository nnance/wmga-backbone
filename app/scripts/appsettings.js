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
        dateFormat: 'MM/DD/YYYY',
        membershipPayNow: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=DNR67PXFP5DX8&invoice=2014-',
        teamPayNow: ''
    };

    return AppSettings;
});
