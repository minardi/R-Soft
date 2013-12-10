/*global client, Backbone*/

client.Models = client.Models || {};

(function () {
    'use strict';

    client.Models.TableModel = Backbone.Model.extend({
        defaults: { 
                        orderid: "",
                        state: "vacant",    //occupied
                        activity: "false",
                        capacity: "n/a",
                        waiter: "n/a"
                    }
    });

})();
