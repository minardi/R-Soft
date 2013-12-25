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


        
        Backbone.Mediator.sub("tables-rendered", function() {
            var route = new client.Routers.TablesRouter();
            Backbone.history.start({
                
            });
        });
    }
};

$(document).ready(function () {
    'use strict';
    client.init();
});
