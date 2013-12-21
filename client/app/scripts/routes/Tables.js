/*global client, Backbone*/

client.Routers = client.Routers || {};

(function () {
    'use strict';

    client.Routers.TablesRouter = Backbone.Router.extend({
     
        initialize: function() {           
            Backbone.Mediator.sub("table-active", this.changeUrl, this);
        },
       
       
        changeUrl: function(table) {          
          this.navigate("tables/" + table.tableid
          //, {trigger: true}
          );         
        },
        
        routes: {
            "(/)tables/:number"        : "myTrigger"          
        },
        
        myTrigger: function(number) {
            var elem = $("#table-container").children()[number];
                      
            $(elem).trigger("click");
        }
            
    });

})();
