/*global client, $*/


window.client = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
        
        var categories = new client.Views.CollectionView(),
        
            orderview = new client.Views.OrderView({
                el: $("#order-container"),
                model: new client.Models.OrderModel()
        });
    }
};

$(document).ready(function () {
    'use strict';
    client.init();
});
