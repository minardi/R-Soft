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
                        return (this.model.get("state") === "vacant")?
									"table_vacant_unactive":
									"table_occupied_unactive";
                    },

        template: JST['app/scripts/templates/TableModelView.ejs'],

        events: {
                    "click": "tableChoose"
                },



        tableActivity:  function(id) {
                            if(this.model.id != id) {
                                if(this.el.className === "table_vacant_active") {
                                    this.el.className = "table_vacant_unactive";
                                }
                                if(this.el.className === "table_occupied_active") {
                                    this.el.className = "table_occupied_unactive";
                                }
                                this.model.set("activity", "false");
                            }
                        },
        
        tableChoose: function(event) {
                        var orderidinfo;
                        
                        if (this.model.get("orderid") === "none") {
                            orderidinfo = {
                                            orderid: this.model.get("orderid"),
                                            isnew: true
                                        };
                        } else {
                            orderidinfo = {
                                            orderid: Number(this.model.get("orderid")),
                                            isnew: false
                                        };
                        }
                        
                        Backbone.Mediator.pub("table-active", orderidinfo);
                        Backbone.Mediator.pub("changeactivity", this.model.id);
                        
                        //create hash for active and unactive classes
						this.model.set("activity", "true");
                        if(this.el.className === "table_vacant_unactive") {
                            this.el.className = "table_vacant_active";
                        } 
                        if(this.el.className === "table_occupied_unactive") {
                            this.el.className = "table_occupied_active";
                        }
                        event.stopPropagation();
                    },

        tableOccupy: function(ordergetid) {
                        if (this.model.get("activity") === "true") {
							this.el.className = "table_occupied_active";
                            
							this.model.set({orderid: ordergetid, state: "occupied"});
                            this.model.url = "tables/" + this.model.id + ".json";
                            this.model.save({silent: "true"});
                        }
                    },

        tableRelease: function() {
                        if (this.model.get("activity") === "true") {
							this.el.className = "table_vacant_unactive";
							
                            this.model.set({orderid: "none", state: "vacant", activity: "false"});
                            this.model.url = "tables/" + this.model.id + ".json";
                            this.model.save({silent: "true"});
                        }
                    },

        render: function(model) {
                    this.$el.html(this.template(this.model.toJSON()));
					this.el.setAttribute("id", "table_" + this.model.id);
                    return this;	
                },
                    
        maprender:  function(model) {
                        this.$el.html(this.template(this.model.toJSON()));
                        this.el.style.left = this.model.get("xchord")+"px";
                        this.el.style.top = this.model.get("ychord")+"px";
                        this.el.style.position = "fixed";
												
                        return this;	
                    }

    });

})();
