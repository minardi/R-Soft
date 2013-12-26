/*global client, Backbone*/

client.Routers = client.Routers || {};

(function (routers, mediator) {
    'use strict';

    routers.TablesRouter = Backbone.Router.extend({
     
        initialize: function() {           
            mediator.sub("changeactivity", this.changeUrl, this);            
        },
       
       
        changeUrl: function(table_id) {          
            this.navigate("table/" + table_id);           
        },        
        
        routes: {
            "(/)table/:number" : "tableTrigger"          
        },
        
        tableTrigger: function(number) {
           Backbone.Mediator.pub("route-trigger", number);
        }
            
    });

})(client.Routers, Backbone.Mediator);