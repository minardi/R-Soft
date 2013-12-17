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
        },
        url : "order_items.json",
        saveModel: function(amount_value) {
                this.url = "order_items/" + this.id +".json";       
/*?*/           this.save(/*{amount: amount_value}, {patch: true}*/);
        }
    });

})();
