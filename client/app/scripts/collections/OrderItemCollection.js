/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.OrderitemsCollection = Backbone.Collection.extend({

        model: client.Models.OrderitemModel,
        url: "order_items.json",
        order_id: 0,
        sum: 0,
        initialize: function() {
            this.fetch({reset: true});
            Backbone.Mediator.subscribeOnce("order-create", this.changeOrderId, this);
        },

        changeOrderId: function(order_id) {
            this.order_id = order_id;
            this.each(this.setOrderId, this);
        },
        setOrderId: function(item) {
            item.set('order_id', this.order_id);
            item.url = "order_items/" + item.id +".json";                
            item.save({silent: true});
        }

    });

})();
