
/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

        client.Views.OrderView = Backbone.View.extend({
            
            initialize: function() {                               
                this.$el.html(this.template());
                
                Backbone.Mediator.sub("table-active", this.universalShow, this);                
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
                
                this.$el.find("#order_items").css('visibility', 'visible');
                this.$el.find("#order_close").css('visibility', 'hidden');
                
                this.newPub();                   
            },

            
            newPub: function() {
                var el = this.$el.find("#order_items"),
                    id = "",                    
                    hash = {
                        "order_id": id,
                        "elem": el,
                        "is_new": true
                    };
                    
                Backbone.Mediator.subscribeOnce("orderitem-add", this.orderSave, this);
                Backbone.Mediator.pub("order-show", hash);            
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
                el.css('visibility', 'visible');                
                
                hash = {
                    "order_id": order.orderid,
                    "elem": el,
                    "is_new": false
                };
                console.log(hash);
                
                this.model.once("sync", this.showSyncModel, this);
                Backbone.Mediator.unsubscribe("orderitem-add", this.orderSave, this);
                Backbone.Mediator.pub("order-show", hash);
                
            },

            
            close: function(event) {        
                this.$el.find("#order_close").css('visibility', 'hidden');
                this.$el.find("#order_items").css('visibility', 'hidden');    
                
                this.model.set({status: "closed"});
                this.model.saveClosed();
                
                Backbone.Mediator.unsubscribe("orderitem-add", this.orderSave, this);
                Backbone.Mediator.pub("order-close");
            },

            
            orderSave: function() {
                this.model.saveNew();
                this.model.once("sync", this.successSaveNew, this);
            },
            
            
            successSaveNew:function() { 
                var order_id = this.model.get("id"); 
                
                this.$el.find("#order_close").css('visibility', 'visible');
        
                Backbone.Mediator.pub("order-create", order_id);
            }
            
        });

})();

