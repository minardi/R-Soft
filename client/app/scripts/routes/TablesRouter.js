/*global client, Backbone*/

client.Routers = client.Routers || {};

(function (routers, mediator) {
    'use strict';

    routers.TablesRouter = Backbone.Router.extend({
     
        initialize: function() {           
            mediator.sub("table-active", this.changeUrl, this);
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

})(client.Routers, Backbone.Mediator);
