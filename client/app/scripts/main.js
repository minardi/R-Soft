/*global client, $*/


window.client = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
        
        var menu_item = new client.Views.MenuItemCollectionView(),categories = new client.Views.CollectionView(),
        
        orderview = new client.Views.OrderView({
            el: $("#order-container"),
            model: new client.Models.OrderModel()
        });

        Backbone.Mediator.sub('order-show', function(data) {
                                                var go_items = new client.Views.OrderitemcollectionView({el: data.elem});
                                                if (!isNaN(data.order_id)) {
                                                    go_items.collection.order_id = data.order_id;
                                                } 
                                            }, this);
    }
};

$(document).ready(function () {
    'use strict';
    client.init();
});
