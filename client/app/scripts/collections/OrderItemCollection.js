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
            Backbone.Mediator.subscribeOnce("order-create", this.changeOrderId, this);
        },

        parse: function(response) {
            var result = [],
				i;

            for (i = 0; i < response.length; i++) {
				if (response[i].order_id === this.order_id) {
					result.push(response[i]);
				}
            }

            return result;
        },

        changeOrderId: function(changed_id) {
            this.order_id = changed_id;
            this.each(this.setOrderId, this);
        },
        
        setOrderId: function(item) {
            item.set('order_id', this.order_id);
            item.saveModel();
        }

    });

})();
