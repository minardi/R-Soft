/*global client, Backbone*/

client.Models = client.Models || {};

(function () {
    'use strict';

    // client.Models.OrderModel = Backbone.Model.extend({

    //var Order = Backbone.Model.extend({

    client.Models.OrderModel = Backbone.Model.extend({

        initialize: function() {
            console.log("OrderModel initialize");
        },

        defaults: {
            status: "status"
        }      

    });

})();
