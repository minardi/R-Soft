
/*global client, Backbone*/

client.Models = client.Models || {};

(function () {
    'use strict';

    client.Models.OrderModel = Backbone.Model.extend({

        initialize: function() {
            
        },
	
    
        defaults: {        
            status: "opened"
        },   
    
    
        saveNew: function() {
            this.url = "orders.json";        
            this.save();           
        },
        
      
        existFetch: function(id) {  
            this.url = "orders/"+id+".json"; 
            this.fetch();
        },
    
    
        saveClosed: function() {  
            this.url = "orders/"+this.id+".json";
            this.save();        
        }    

    });

})();

