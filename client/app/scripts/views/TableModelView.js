/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.TableModelView = Backbone.View.extend({
        
        initialize: function() {
                        this.model.on("change", this.render, this);
                        Backbone.Mediator.sub("order-create", this.tableOccupy, this);
                        Backbone.Mediator.sub("order-close", this.tableRelease, this);
                        Backbone.Mediator.sub("changeactivity", this.tableActivity, this);
                    },
                                 
        className:  function() {
                        if (this.model.get("state") === "vacant") {
                            return "table_vacant_unactive";
                        } else {
                            return "table_occupied_unactive";
                        };
                    },
                    
        template: _.template("<%=id%>"),
                
        events: {
                    "click": "tableChoose",
                },
                
       
                        
        tableActivity: function(id) {
                                if(this.model.id != id) {
                                    if(this.$el.className === "table_vacant_active") {
                                        this.$el.className = "table_vacant_unactive";
                                    } else {
                                        this.$el.className = "table_occupied_unactive";
                                    }
                                    this.model.set("activity", "false");
                                }
                            },
        
        tableChoose: function(event) {
                        Backbone.Mediator.pub("table-active", this.model.orderid);
                        Backbone.Mediator.pub("changeactivity", this.model.id);
                        console.log("Event 'table-active' published");
                        this.model.set("activity", "true");
                        if(this.$el.className === "table_vacant_unactive") {
                            this.$el.className = "table_vacant_active";
                        } else {
                            this.$el.className = "table_occupied_active";
                        }
                        event.stopPropagation();
                    },
        
        tableOccupy: function(orderid) {
                        if (this.model.get("activity") === "true") {
                            this.model.set("state", "occupied");
                            this.el.className = "table_occupied_active";
                            this.model.orderid = orderid;
                            this.model.url = "tables/" + this.model.id +".json";
                            this.model.save({silent: "true"});
                        }
                    },
                    
        tableRelease: function() {
                        if (this.model.get("activity") === "true") {
                            this.model.set("state", "vacant");
                            this.el.className = "table_vacant_active";
                            this.model.orderid = "";
                            this.model.url = "tables/" + this.model.id +".json";
                            this.model.save({silent: "true"});
                        }
                    },
                    
        render: function(model) {
                    console.log(this.model);
                    this.$el.html(this.template(this.model.toJSON()));                        
                    return this;	
                }

    });

})();
