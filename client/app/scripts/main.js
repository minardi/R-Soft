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
            });
       
        Backbone.Mediator.sub('order-show', function(data) {
            var go_items = new client.Views.OrderitemcollectionView({el: data.elem});
            if (!isNaN(data.order_id)) {
                go_items.collection.order_id = data.order_id;
            }
        }, this);

        
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
