/*global client, $*/


window.client = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log("It's work!");
    }
};

$(document).ready(function () {
    'use strict';
    client.init();
});
