/*global client, $*/


window.client = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';

        console.log('It"s work!');
		
//////////origin/master
        var menu_item = new client.Views.MenuItemCollectionView(),
//		menu_item_desc = new client.Views.MenuItemDescCollection(), //not ready yet
		categories = new client.Views.CollectionView();

        console.log('Hello from Backbone!');
    }
};

$(document).ready(function () {
    'use strict';
    client.init();
});

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/CategoryView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'category-name\'>\r\n\t' +
((__t = ( category_name )) == null ? '' : __t) +
'\r\n</div>\r\n<div class=\'category-content\'></div>';

}
return __p
};

this["JST"]["app/scripts/templates/CategoryViewCollection.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/templates/MenuItem.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = "menu_item_tpl">\n\t<div class = "menu_item_name">' +
((__t = ( name )) == null ? '' : __t) +
'</div>\n\t<div class = "menu_item_description">' +
((__t = ( description )) == null ? '' : __t) +
'</div>\n\t<div class = "menu_item_price">' +
((__t = ( price )) == null ? '' : __t) +
' $</div>\n\t<div class = "add_to_order"><img src="images/blue_arrow_right.png" alt="add_to_order"></div>\n</div>\n\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/Order.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = "order_box">\r\n\t<p id="order_head"> Order</p>\r\n\t\r\n\t<div id="order_items" class="order_items">\r\n\t\t<div class="sum">Order amount: <span id="sum"></span></div>\r\n\t</div>\t\r\n\t\r\n\t<input type = "button" id = "order_close" value = "Close order">  </input>\r\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/OrderItem.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="order_item"  class="order_item">\r\n\t<div class="order_item_name"><?=name?></div>\r\n\t<div id="add_amount" class="add_amount"><br/></div>\r\n\t<div id="order_item_amount" class="order_item_amount"><?=amount?></div>\r\n\t<div id="remove_amount" class="remove_amount"><br/></div>\r\n\t<div class="order_item_price"><?=price?></div>\r\n\t<span class="order_item_status"><?=status?></span>\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/templates/OrderItemCollection.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/templates/TableCollectionView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/templates/TableModelView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( id )) == null ? '' : __t) +
'\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/templates/menu_item_desc.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\n\n';

}
return __p
};
/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.MenuItemView = Backbone.View.extend({

        template: JST['app/scripts/templates/MenuItem.ejs'],
        events: {
            'click .add_to_order': 'addMediatorPub'
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },

        addMediatorPub : function() {
            Backbone.Mediator.pub( 'addOrderItem', { 'name': this.model.get('name'), 'price': this.model.get('price') } );
        }

    });

})();

/*global client, Backbone*/

client.Models = client.Models || {};

(function () {
    'use strict';

    client.Models.MenuItemModel = Backbone.Model.extend({
        defaults: {
            category : 'N/A',
            name : 'N/A',
            description : 'N/A',
            price : 'N/A'
        }
    });

})();

/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.MenuItemCollection = Backbone.Collection.extend({
        initialize: function() {
            this.fetch()
			},

        model: client.Models.MenuItemModel,
        url: 'menu_items.json'
    });

})();

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.MenuItemCollectionView = Backbone.View.extend({
        initialize: function() {
            this.collection = new client.Collections.MenuItemCollection();

            Backbone.Mediator.subscribeOnce ( 'categories-ready', this.render, this );
            this.elements = {};
        },


        addItem: function( item ) {
            var view = new client.Views.MenuItemView( { model: item } ),
                key = item.get( 'category' ),
                element = this.elements[ key ];

            element.append( view.render().el );

        },


        render: function( elements ) {
            this.elements = elements;
            this.collection.each( this.addItem, this );
        }
    });


})();

/*global client, Backbone*/

client.Models = client.Models || {};

(function () {
    'use strict';

    client.Models.Model = Backbone.Model.extend({
        defaults: {
            category_name: 'noname'
        },
        view: undefined
    });

})();

/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.Collection = Backbone.Collection.extend({

        model: client.Models.Model,
        initialize: function() {
            //this.testAdding();
            //this.reset(this.models);
            this.fetch({reset: true});
        },
        url: '/categories',
        testAdding: function() {
            var Model = client.Models.Model;
            this.add(new Model({'category_name': 'Dricks'}));
            this.add(new Model({'category_name': 'Dessetrs'}));
            this.add(new Model({'category_name': 'Entrees'}));
            this.add(new Model({'category_name': 'Sides'}));
            this.add(new Model({'category_name': 'Bar'}));
        }

    });

})();

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.View = Backbone.View.extend({
        model:undefined,
        tagName: 'div',
        className: "category-container",        
        template: JST['app/scripts/templates/CategoryView.ejs'],
        
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

})();

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.CollectionView = Backbone.View.extend({

        //template: JST['app/scripts/templates/CategoryViewCollection.ejs']
        cattegories_obj: {},
        el: $('#menu-container'),
        initialize: function() {
            this.$el = $('#menu-container');

            this.collection = new client.Collections.Collection();
            this.collection.on('reset', this.afterLoad, this);
        },
        afterLoad: function () {
            this.render();
            Backbone.Mediator.pub('categories-ready', this.cattegories_obj);
        },
        render: function() {
            this.$el.html("Menu");
            this.collection.each(this.addOneCategory, this);
        },
        addOneCategory: function(model) {
            var view = new client.Views.View({
                'model': model
            });
            this.cattegories_obj[model.get('category_name')] = view.$el;
            this.$el.append(view.render().$el);
        }

    });

})();

/*global client, Backbone*/

client.Models = client.Models || {};

(function () {
    'use strict';

    client.Models.TableModel = Backbone.Model.extend({
        defaults: { 
                        orderid: "",
                        state: "vacant",    //occupied
                        activity: "false",
                        capacity: "n/a",
                        waiter: "n/a"
                    }
    });

})();

/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.TableCollection = Backbone.Collection.extend({

        model: client.Models.TableModel

    });

})();

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

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.TableCollectionView = Backbone.View.extend({
        
        initialize: function() {
                        this.collection = new client.Collections.TableCollection();
                        this.collection.url = "tables.json";
                        this.collection.fetch();
                        console.log("Fetching Collection Complete");
                        this.collection.once("sync", this.render, this);
                    },
                                    
        el: $("#hall"),
    
        render: function() {
            console.log("Rendering Collection...");
            this.collection.each(this.rendermodel, this);
            console.log(this.collection);
            console.log("Collection Rendered");
        },
                                       
        rendermodel: function(tablemodel) {
                        var view = new client.Views.TableModelView({model: tablemodel});
                        this.$el.append(view.render().el);
                    }

    });

})();

/*global client, Backbone*/

client.Models = client.Models || {};

(function () {
    'use strict';

	// client.Models.OrderModel = Backbone.Model.extend({
	
	//var Order = Backbone.Model.extend({
	
	client.Models.OrderModel = Backbone.Model.extend({
	
		defaults: {			
			status: "status"				
		}		
		

    });

})();

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    //client.Views.OrderView = Backbone.View.extend({

        template: JST['app/scripts/templates/Order.ejs'],
		
		
		//OrderView = Backbone.View.extend({

		client.Views.OrderView = Backbone.View.extend({
		
			initialize: function() {
				console.log("OrderView initialize");				
				
				Backbone.Mediator.sub("table-active", this.universalShow, this);				
			},

			events: {
				"click #order_close": "close"
			},
			
			className: "order_box",
			//template: _.template($("#order_tpl").html()),
			
			
			universalShow: function(id) {		
				if (isFinite(id)) {
					this.existShow(id);
				}else{
					this.newRender(id);
				}
				console.log("universalShow");
			},
						
			newRender: function(order) {
				
				console.log("newRender is rendering");				
				this.$el.html(this.template());	
				var el = this.$el.find("#order_items");
				Backbone.Mediator.subscribeOnce("orderitem-add", this.orderSave, 1);
				var order_id = "new",
					el = $("#order_items"),
					hash = {
						"order_id": order_id,
						"el": el
					};				
				Backbone.Mediator.pub("order-show", hash);
			},

			showSyncmodel: function(order) {		
				$("#order_close").css('visibility', 'visible');
				console.log(order);
			},
			
			existShow: function(id) {
				Backbone.Mediator.unsubscribe("orderitem-add", this.orderSave, 1);
				var order = new Order();
				this.$el.html(this.template(order.toJSON()));
				var	el = $("#order_items"),
					hash = {
							"order_id": id,
							"el": el
						};				
				Backbone.Mediator.pub("order-show", hash);	
				console.log(id);					
				order.url = "orders/"+id+".json";				
				order.fetch();
				order.on("sync", this.showSyncmodel, order); //??
			},			
						
			close: function() {				
				console.log("close order");				
				Backbone.Mediator.unsubscribe("orderitem-add", this.orderSave, 1);
				$("#order_close").css('visibility', 'hidden');
				//(this.$el.find(".order-box")).remove();
				//this.set({"status":"closed"});
				//this.save();				
				Backbone.Mediator.pub("order-close");			
			},			
	
			orderSave: function(event) {		
				var order = new Order();				
				order.url = "orders.json";
				
				order.save(
				{error: function(){
					console.log("order.save ERROR");
				}},
				{success: function (order){
					console.log("orders.save SUCCESS!!! ");
					$("#order_close").css('visibility', 'visible');
					var order_id = order.get("id");
							
					Backbone.Mediator.pub("order-create", order_id);					
				}}
				);	
		
			}
			
		});
		
		

    //});

})();

/*global client, Backbone*/

client.Models = client.Models || {};

(function () {
    'use strict';

    client.Models.OrderitemModel = Backbone.Model.extend({
    	defaults: {
            name: "N/A",
            amount: 1,
            price: 0,
            status: "Not ready",
            order_id: 0
        }
    });

})();

/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.OrderitemsCollection = Backbone.Collection.extend({

        model: client.Models.OrderitemModel

    });

})();

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.OrderitemView = Backbone.View.extend({
        initialize: function() {
    		//this.model.on("change", this.saveItemModel, this);
            Backbone.Mediator.sub('item-coincidence', this.incrCoincidenceAmount, this);
    	},

        template: JST['app/scripts/templates/OrderItem.ejs'],
        events: {
	            "click #add_amount": "incrAmount",
				"click #remove_amount": "decrAmount"
        },

        render: function() {
            var price = this.model.get('price'),
                amount = this.model.get('amount'),
                difference_price = price * amount;

            this.$el.html(this.template(this.model.toJSON()));
            Backbone.Mediator.pub("amount", {
                                            "operation": "add",
                                            "difference": difference_price
                                            }
            );
            return this;
        },

        incrAmount: function(e) {
            e.stopPropagation();
            e.preventDefault();
            var amount = this.model.get('amount'),
                price = this.model.get('price'),
                decr_block = this.$el.find('#remove_amount');
        	amount++;
        	this.model.set('amount', amount);
            this.saveItemModel();
            Backbone.Mediator.pub("amount", {
                                            "operation": "add",
                                            "difference": price
                                            }
            );
         	decr_block.removeClass('close_item');
        },
        incrCoincidenceAmount: function(changing_item) {
            var amount = changing_item.get('amount'),
                price = changing_item.get('price');//,
                //decr_block = changing_item.$el.find('#remove_amount');
            amount++;
            changing_item.set('amount', amount);
            this.saveItemModel();
            Backbone.Mediator.pub("amount", {
                                            "operation": "add",
                                            "difference": price
                                            }
            );
			this.$el.find('#order_item_amount').html(this.model.get('amount'));
            //decr_block.removeClass('close_item');
        },
        decrAmount: function(e) {
            e.stopPropagation();
            e.preventDefault();
        	var amount = this.model.get('amount'),
                price = this.model.get('price'),
                decr_block = this.$el.find('#remove_amount');
            amount--;

            if (amount > 0) {
	            	this.model.set('amount', amount);
                    this.saveItemModel();
	                Backbone.Mediator.pub("amount", {
	                                "operation": "sub",
	                                "difference": price
	                                }
	                );
            } else if (amount == 0) {
            		this.model.set('amount', amount);
                    this.saveItemModel();
	            	Backbone.Mediator.pub("amount", {
	                                "operation": "sub",
	                                "difference": price
	                                }
	                );
	                decr_block.addClass('close_item');
            } else if (amount < 0){
					var destroy_view = this;
            		this.model.url = "order_items/" + this.model.id +".json";
                    console.log('This model:');
                    console.dir(this.model);

		            this.model.destroy({
		            					success: function() {
											destroy_view.remove();
                                            console.log('Was destroy');
		            					}
		            				  });
		            
            }

        },

        //Work with DB
        saveItemModel: function() {
				this.model.url = "order_items/" + this.model.id +".json";				
				this.model.save({silent: true},
                    {error: function() {
                                console.error("Amount saving ERROR!!!");
                            }
                    },
                    {success: function() {
                                //elem.find('#order_item_amount').html(this.model.get('amount'));
                            }
                    }
                );
                this.$el.find('#order_item_amount').html(this.model.get('amount'));
        }
    });

})();

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.OrderitemcollectionView = Backbone.View.extend({

        template: JST['app/scripts/templates/OrderItemCollection.ejs'],
        initialize: function() {
    		this.collection = new client.Collections.OrderitemsCollection();
    		this.collection.on('add', this.addItemToDB, this);
    		this.collection.url = "order_items.json";
            this.collection.fetch(/*{reset: true}*/);
            this.collection.on("reset", this.renderCollectionFromDB, this);
            Backbone.Mediator.sub("amount", this.changeSum, this);
			Backbone.Mediator.sub("orderitem-add", this.addDataToModel, this);
			Backbone.Mediator.sub("order-create", this.saveOrderId, this);
			this.collection.order_id = 0;
			//this.el = $("");
			//this.saveOrderId();
    	},
    	//el: this.elem,
		//el: $("#order_items"),
		
        events: {
            "click": "render"
        },

        render: function() {
            event.stopPropagation();
            event.preventDefault();
            Backbone.Mediator.pub("orderitem-add", {
                "name": "Smth food...",
                "price": 10
            });
        },

        addDataToModel: function(item_data) {
            //ВОПРОС collection.findWhere(attributes)???????????????????????????????????????
            //var checking_model = this.collection.findWhere({'name': item_data.name});
            var checking_model = this.collection.where({'name': item_data.name});

            if (checking_model[0]) {
                Backbone.Mediator.pub('item-coincidence', checking_model[0]);
            } else {
                this.collection.add(new client.Models.OrderitemModel({
                    "name": item_data.name,
                    "price": item_data.price,
                    "order_id": this.collection.order_id
                    }));
                    /*Backbone.Mediator.pub("amount", {
                                        "operation": "add",
                                        "difference": item_data.price
                                        }
                    );*/
            }
        },

    	changeSum: function(changing_data) {
            var sum = Number(this.$el.find("#sum").html()),
                changing = {
                            "add": function() {
                                        sum += Number(changing_data.difference);
                                    },
                            "sub": function() {
                                        sum -= Number(changing_data.difference);
                                    }
            };
            changing[changing_data.operation]();
            sum = sum.toFixed(2);
            this.$el.find("#sum").html(String(sum));
        },
        saveOrderId: function(data) {
            this.collection.order_id = data.order_id;
            this.collection.each(this.changeOrderId, this);
            console.log(this.collection);
        },
        changeOrderId: function(item) {
           item.set('order_id', this.collection.order_id);
           item.url = "order_items/" + item.id +".json";                
           item.save({silent: true},
                    {error: function() {
                                console.error("Order_id saving ERROR!!!");
                            }
                    },
                    {success: function() {
                                console.log("Order_id saved" + this.collection);
                            }
                    }
                );

        },

        //Work with DB
        addItemToDB: function(item) {
            var view = new client.Views.OrderitemView({model: item});//,
                //elem = this.$el;
            item.url = "order_items.json";
            console.log('Begin adding item TO DB...');
            console.log(this.collection);
            item.save(
                {error: function() {
                            console.error("Saving ERROR!!!");
                        }
                },
                {success: function() {
                            console.log('Finish adding item TO DB!');
                            //elem.prepend(view.render().el);
                        }
                } 
            );
            this.$el.prepend(view.render().el);
        },
        addItemsFromDB: function(item) {
           //console.log(item.get('order_id'));
           //if (item.get('order_id') == this.collection.order_id) {
                var view = new client.Views.OrderitemView({model: item});
                console.log(this.collection);
                this.$el.prepend(view.render().el);
           //}
        },
        renderCollectionFromDB: function() {
			var save_block_sum = this.$el.find('#block_sum');
			save_block_sum.find('#sum').html('');
            this.$el.html('');
			this.$el.append(save_block_sum);
            console.log('Begin adding items FROM DB...');
            this.collection.each(this.addItemsFromDB, this);
            console.log(this.collection);
            console.log('Finish adding items FROM DB!');
        }
        
    });
    
    //var go_items = new App.Views.Items();


})();
