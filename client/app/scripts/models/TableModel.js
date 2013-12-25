/*global client, Backbone*/

client.Models = client.Models || {};

(function () {
    'use strict';

    client.Models.TableModel = Backbone.Model.extend({

        defaults: {
                    orderid: "none",
                    state: "vacant",    //occupied
                    activity: "false",
                    capacity: 0,
                    waiter: "n/a",
                    xchord: 0,
                    ychord: 0
                }

    });

})();
