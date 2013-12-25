/*global client, Backbone*/

client.Routers = client.Routers || {};

(function (routers, mediator) {
    'use strict';

    routers.TablesRouter = Backbone.Router.extend({
     
        initialize: function() {           
            mediator.sub("changeactivity", this.changeUrl, this);
        },
       
       
        changeUrl: function(table_id) {          
            this.navigate("table/" + table_id
                //, {trigger: true}
            );           
        },
        
        routes: {
            "(/)table/:number" : "myTrigger"          
        },
        
        myTrigger: function(number) {
            var elem = $("#table-container").find("#table_"+ number);
                      
            $(elem).trigger("click");
        }
            
    });

})(client.Routers, Backbone.Mediator);
