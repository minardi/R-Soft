
/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function (views, mediator) {
    'use strict';

        views.OrderView = Backbone.View.extend({
            
            initialize: function() {                               
                this.$el.html(this.template());
                
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
                };                
            },

            
            newCreate: function() { 
                this.model = new client.Models.OrderModel();                      
                
                this.$el.find("#order_items").css('visibility', 'visible'); //use class
                this.$el.find("#order_close").css('visibility', 'hidden');
                
                this.newPub();                   
            },

            
            newPub: function() {
                var el = this.$el.find("#order_items"),                    
                    hash = {
                        "elem": el,
                        "is_new": true
                    };
                    
                mediator.subscribeOnce("change-order-id", this.orderSave, this);
                mediator.pub("order-show", hash);            
            },
            
            
            showSyncModel: function(order) {  
                this.$el.find("#order_close").css('visibility', 'visible');               
            },

            
            existRender: function(order) {
                var el = this.$el.find("#order_items"),
                    hash;                    
				
                this.model = new client.Models.OrderModel();   
                this.model.existFetch(order.orderid);
                                
                this.$el.find("#order_close").css('visibility', 'visible');
                el.css('visibility', 'visible'); // create hash el's                
                
                hash = {
                    "order_id": order.orderid,
                    "elem": el,
                    "is_new": false
                };
                console.log(hash);
                
                this.model.once("sync", this.showSyncModel, this);
                mediator.unsubscribe("change-order-id", this.orderSave, this);
                mediator.pub("order-show", hash);
                
            },

            
            close: function(event) {        
                this.$el.find("#order_close").css('visibility', 'hidden');
                this.$el.find("#order_items").css('visibility', 'hidden');    
                
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
                
                this.$el.find("#order_close").css('visibility', 'visible');
        
                mediator.pub("order-create", order_id);
            }
            
        });

})(client.Views, Backbone.Mediator);

