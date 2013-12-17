/*global client, Backbone*/

client.Models = client.Models || {};

(function () {
    'use strict';

    client.Models.OrderitemModel = Backbone.Model.extend({
    	defaults: {
            name: "N/A",
            amount: 1,
            price: 0,
            status: "Not ready",
            order_id: 0
        }
    });

})();
