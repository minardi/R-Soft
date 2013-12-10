/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    //client.Views.OrderView = Backbone.View.extend({

        template: JST['app/scripts/templates/Order.ejs'],
		
		
		//OrderView = Backbone.View.extend({

		client.Views.OrderView = Backbone.View.extend({
		
			initialize: function() {
				console.log("OrderView initialize");				
				
				Backbone.Mediator.sub("table-active", this.universalShow, this);				
			},

			events: {
				"click #order_close": "close"
			},
			
			className: "order_box",
			template: _.template($("#order_tpl").html()),
			
			
			universalShow: function(id) {		
				if (isFinite(id)) {
					this.existShow(id);
				}else{
					this.newRender(id);
				}
				console.log("universalShow");
			},
						
			newRender: function(order) {
				
				console.log("newRender is rendering");				
				this.$el.html(this.template());	
				var el = this.$el.find("#order_items");
				Backbone.Mediator.subscribeOnce("orderitem-add", this.orderSave, 1);
				var order_id = "new",
					el = $("#order_items"),
					hash = {
						"order_id": order_id,
						"el": el
					};				
				Backbone.Mediator.pub("order-show", hash);
			},

			showSyncmodel: function(order) {		
				$("#order_close").css('visibility', 'visible');
				console.log(order);
			},
			
			existShow: function(id) {
				Backbone.Mediator.unsubscribe("orderitem-add", this.orderSave, 1);
				var order = new Order();
				this.$el.html(this.template(order.toJSON()));
				var	el = $("#order_items"),
					hash = {
							"order_id": id,
							"el": el
						};				
				Backbone.Mediator.pub("order-show", hash);	
				console.log(id);					
				order.url = "orders/"+id+".json";				
				order.fetch();
				order.on("sync", this.showSyncmodel, order); //??
			},			
						
			close: function() {				
				console.log("close order");				
				Backbone.Mediator.unsubscribe("orderitem-add", this.orderSave, 1);
				$("#order_close").css('visibility', 'hidden');
				//(this.$el.find(".order-box")).remove();
				//this.set({"status":"closed"});
				//this.save();				
				Backbone.Mediator.pub("order-close");			
			},			
	
			orderSave: function(event) {		
				var order = new Order();				
				order.url = "orders.json";
				
				order.save(
				{error: function(){
					console.log("order.save ERROR");
				}},
				{success: function (order){
					console.log("orders.save SUCCESS!!! ");
					$("#order_close").css('visibility', 'visible');
					var order_id = order.get("id");
							
					Backbone.Mediator.pub("order-create", order_id);					
				}}
				);	
		
			}
			
		});
		
		

    //});

})();
