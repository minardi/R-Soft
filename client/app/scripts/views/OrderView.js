
/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function (views, mediator) {
    'use strict';

views.OrderView = Backbone.View.extend({
            
            initialize: function() {                               
                this.$el.html(this.template());
                
                this.elem = {
                    "btn_close"       : this.$el.find("#order_close"),
                    "items_container" : this.$el.find("#order_items")
                };
                
                this.elem.btn_close.addClass("hidden_in_order");
                
                mediator.sub("table-active", this.universalShow, this);
            },
            
            events: {
                "click #order_close": "close"
            },
                       
            template: JST['app/scripts/templates/Order.ejs'],
            
            universalShow: function(order) {
               if (order.isnew) {
                    this.newCreate();
                } else {
                    this.existRender(order);
                }                
            },
            
            newCreate: function() { 
                this.model = new client.Models.OrderModel(); 
              
                if(this.elem.items_container.hasClass("hidden_in_order")) {
                                    this.elem.items_container.removeClass("hidden_in_order");
                                }  
                this.elem.items_container.addClass("visible_in_order");
                
                if(this.elem.btn_close.hasClass("visible_in_order")) {
                                    this.elem.btn_close.removeClass("visible_in_order");
                                }
                this.elem.btn_close.addClass("hidden_in_order");
                
                this.newPub();                   
            },
            
            newPub: function() {                                  
                var hash = {
                        "elem": this.elem.items_container,
                        "is_new": true
                    };
                
                mediator.subscribeOnce("change-order-id", this.orderSave, this);
                mediator.pub("order-show", hash);            
            },
                        
            showSyncModel: function(order) {                  
                this.elem.btn_close.removeClass("hidden_in_order");
                this.elem.btn_close.addClass("visible_in_order");
                              
            },
            
            existRender: function(order) {                
                var hash;                    
				
                this.model = new client.Models.OrderModel();   
                this.model.existFetch(order.orderid);
                
                if(this.elem.items_container.hasClass("hidden_in_order")) {
                                    this.elem.items_container.removeClass("hidden_in_order");
                                }
                this.elem.items_container.addClass("visible_in_order");
                
                if(this.elem.btn_close.hasClass("hidden_in_order")) {
                                    this.elem.btn_close.removeClass("hidden_in_order");
                                }
                this.elem.btn_close.addClass("visible_in_order");
                                
                hash = {
                    "order_id": order.orderid,
                    "elem": this.elem.items_container,
                    "is_new": false
                };
                                
                this.model.once("sync", this.showSyncModel, this);
                mediator.unsubscribe("change-order-id", this.orderSave, this);
                mediator.pub("order-show", hash);
                
            },
            
            close: function(event) {                            
                this.elem.items_container.removeClass("visible_in_order"); 
                this.elem.items_container.addClass("hidden_in_order");    
                
                this.elem.btn_close.removeClass("visible_in_order");
                this.elem.btn_close.addClass("hidden_in_order");
                
                this.model.set({status: "closed"});
                this.model.saveClosed();
                
                mediator.unsubscribe("change-order-id", this.orderSave, this);
                mediator.pub("order-close");
            },
            
            orderSave: function() {
                this.model.saveNew();
                this.model.once("sync", this.successSaveNew, this);
            },            
            
            successSaveNew:function() { 
                var order_id = this.model.get("id");                 
        
                this.elem.btn_close.removeClass("hidden_in_order");
                this.elem.btn_close.addClass("visible_in_order");
        
                mediator.pub("order-create", order_id);
            }
            
        });
})(client.Views, Backbone.Mediator);

