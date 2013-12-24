/*global client, $*/

window.client = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';

       
        var menu_item = new client.Views.MenuItemCollectionView(),
			description = new client.Views.MenuItemDescCollView(),        
            categories = new client.Views.CategoryCollectionView(),        
            
            orderview = new client.Views.OrderView({
                el: $("#order-container"),
                model: new client.Models.OrderModel()
            }),        
        
            tables = new client.Views.TableCollectionView({
                el: $("#table-container")
            }),

            order_items = new client.Views.OrderitemcollectionView();


        console.log('Hello from Backbone!');
  /*      
        var menu_item = new client.Views.MenuItemCollectionView(), 
			description = new client.Views.MenuItemDescCollView(),		
            categories = new client.Views.CategoryCollectionView();
     
            orderview = new client.Views.OrderView({
>>>>>>> a812169ed4fde0795de689c26e9d8309bc627d73
                el: $("#order-container"),
                model: new client.Models.OrderModel()
            }),        
        
            tables = new client.Views.TableCollectionView({
                el: $("#table-container")
            });
    */           
        
        /*Backbone.Mediator.sub('order-show', function(order_data) {
            var go_items = new client.Views.OrderitemcollectionView({el: order_data.elem}, {is_new: order_data.is_new});
            if (!order_data.is_new) {
                go_items.collection.order_id = order_data.order_id;
            }
        }, this);*/

        
        Backbone.Mediator.sub("tables-rendered", function() {
            var route = new client.Routers.TablesRouter();
            Backbone.history.start({
                //pushState: true
            });
        });
    }
};

$(document).ready(function () {
    'use strict';
    client.init();
});
