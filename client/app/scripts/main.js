/*global client, $*/


window.client = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log("It's work!");
		
		
		$.ajaxSetup({
			headers:{
				'X-CSRF-Token':$('meta[name="csrf-token"]').attr('content')
			}
		});	
		
		
        var category = new this.Views.CategorycollectionView(),
            tables = new this.Views.TableCollectionView(),
			
		orderview = new this.Views.OrderView();   //new OrderView({
			el: $("#order_container"),
			model: new this.Models.OrderModel() //new Order()
		});
            
        Backbone.Mediator.sub('order-show', function(data){
                                            var go_items = new client.Views.OrderitemcollectionView({el: data.elem});
                                            //console.log(data.elem);
                                            //go_items.elem = data.elem;
                                            if (!isNaN(data.order_id)) {
                                                go_items.collection.order_id = data.order_id;
                                            } 
                                        }
        , this);
    }
};

$(document).ready(function () {
    'use strict';
    client.init();
});
