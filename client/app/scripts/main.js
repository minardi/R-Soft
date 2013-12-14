/*global client, $*/


window.client = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
        
        var categories = new client.Views.CollectionView();
    }
};

$(document).ready(function () {
    'use strict';
    client.init();
});
