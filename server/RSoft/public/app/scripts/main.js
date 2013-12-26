/*global client, $*/

window.client = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';

       
        var menu_item = new client.Views.MenuItemCollectionView(),
			description = new client.Views.MenuItemDescCollView(),        
            categories = new client.Views.CategoryCollectionView(),        
            
            orderview = new client.Views.OrderView({
                el: $("#order-container"),
                model: new client.Models.OrderModel()
            }),        
        
            tables = new client.Views.TableCollectionView({
                el: $("#table-container")
            }),

            order_items = new client.Views.OrderitemcollectionView();


        
        Backbone.Mediator.sub("tables-rendered", function() {
            var route = new client.Routers.TablesRouter();
            Backbone.history.start();
        });
    }
};

$(function () {
    'use strict';
    client.init();
});

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/CategoryView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'category-name\'>\n\t' +
((__t = ( category_name )) == null ? '' : __t) +
'\n</div>\n<div class=\'category-content\'></div>';

}
return __p
};

this["JST"]["app/scripts/templates/MenuItem.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = "menu_item_tpl">\n\t<div class = "scale_cont">\n\t\t<div class = "menu_item_name">' +
((__t = ( name )) == null ? '' : __t) +
'</div>\n\t\t<div class = "menu_item_price">' +
((__t = ( price )) == null ? '' : __t) +
' $</div>\n\t\t</div>\n\t<div class = "add_to_order"><img src="images/blue_arrow_right.png" alt="add_to_order"></div>\n</div>\n\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/MenuItemDesc.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = \'desc\' >\n\t<div class = "wrap">\n\t\t<div class = "desc_name">' +
((__t = ( name )) == null ? '' : __t) +
'</div>\n\t\t<div class = "desc_description">' +
((__t = ( description )) == null ? '' : __t) +
'</div>\n\t</div>\n\t<div class = "desc_pic"><img src="images/' +
((__t = ( id )) == null ? '' : __t) +
'.jpg"></div>\n</div>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/Order.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n    <p id="order_head"> Order</p>\n\n    <div id="order_items" class="order_items">\n    </div>\n    \n    <input type = "button" id = "order_close" value = "Close order">  </input>\n';

}
return __p
};

this["JST"]["app/scripts/templates/OrderItem.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="order_item_name">' +
((__t = (name)) == null ? '' : __t) +
'</div>\n<div id="add_amount" class="add_amount"><br/></div>\n<div id="order_item_amount" class="order_item_amount">' +
((__t = (amount)) == null ? '' : __t) +
'</div>\n<div id="remove_amount" class="remove_amount"><br/></div>\n<div class="order_item_price">' +
((__t = (price)) == null ? '' : __t) +
'</div>\n<span class="order_item_status">' +
((__t = (status)) == null ? '' : __t) +
'</span>';

}
return __p
};

this["JST"]["app/scripts/templates/OrderItemCollection.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="block_sum" class="sum">\n  \tOrder amount: <span id="sum">' +
((__t = (sum)) == null ? '' : __t) +
'</span>\n</div>\n<div id="loader_block" class="preloader_block">\n  \t<img src="images/coffee.gif" class="preloader">\n  \t<div class="helper"></div>\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/TableCollectionView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="tablemap-container"></div>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/TableMapModelView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="bgdark" class="darkbg"></div>\n<div id="tablemap" class="table_map">\n    <input type="button" id="hidetablemap" value="Hide Map">\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/TableModelView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( id )) == null ? '' : __t) +
'\n\n';

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
            'click .add_to_order': 'sendMenuItemToOrder',
			'click .menu_item_name': 'addDescView'
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },

        sendMenuItemToOrder : function() {
//			console.log( this.model.get( 'name' ) + ' sent to Order' );
            Backbone.Mediator.pub( 'orderitem-add', { name: this.model.get( 'name' ), price: this.model.get( 'price' ) } );
        },
		
		addDescView: function(){ //sent mediator dlya descr
//			console.log( 'name: ' + this.model.get( 'name' ) );
//			console.log( this.el );
			Backbone.Mediator.pub('addMenuItemDesc', { 'id': this.model.get( 'description' ), 'el': this.el } );
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
//            this.fetch( /*{reset: true}*/ );

            this.add( new client.Models.MenuItemModel( { "category": "Drinks"
				, "name": "Capuccino"
				, "description": "1" 
				, "price": "5"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Desserts"
				, "name": "Ice Cream"
				, "description": "2"
				,  "price": "4"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Desserts"
				, "name": "Cream Pie"
				, "description": "3"
				,  "price": "4"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Entrees"
				, "name": "Soup"
				, "description": "4"
				, "price": "10"} ));
            this.add( new client.Models.MenuItemModel( { "category": "Drinks"
				, "name": "Esspreso"
				, "description": "5"
				, "price": "5"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Sides"
				, "name": "Cheese"
				, "description": "6"
				, "price": "10"} ) );          
			this.add( new client.Models.MenuItemModel( { "category": "Bar"
				, "name": "Mochitto"
				, "description": "7"
				, "price": "3"}));
            this.add( new client.Models.MenuItemModel( { "category": "Bar"
				, "name": "Green Mexican"
				,"description": "8"
				, "price": "5"}));
            this.add( new client.Models.MenuItemModel( { "category": "Bar"
				, "name": "B-52"
				, "description": "9"
				, "price": "3"})); 
        }, 

        model: client.Models.MenuItemModel,
 //       url: 'menu_items.json'
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
//			console.log(this.collection);
        },
		
		
        addItem: function( item ) {
	//	console.log(item);
            var view = new client.Views.MenuItemView( { model: item } ),
                key = item.get( 'category' ),
                element = this.elements[ key ];
				
			if(element) {
				element.append( view.render().el );
			} else {
				console.warn( "The category: " + item.get( 'category') + "didn't create" );			
			}
        },


        render: function( elements ) {
//		console.log(elements);
            this.elements = elements;
            this.collection.each( this.addItem, this );
        }
    });


})();

/*global client, Backbone*/

client.Models = client.Models || {};

(function (models) {
    'use strict';

    models.CategoryModel = Backbone.Model.extend({
    
        defaults: {
            category_name: 'noname'
        },        
    });

})(client.Models);

/*global client, Backbone*/

client.Collections = client.Collections || {};

(function (collections, models) {
    'use strict';

    collections.CategoryCollection = Backbone.Collection.extend({

        model: models.CategoryModel,
        url: '/categories',

        initialize: function() {		    
            this.fetch({reset: true});
        }

    });

})(client.Collections, client.Models);

/*global client, Backbone, JST*/

client.Views = client.Views || {};


(function (views) {
    'use strict';

    views.CategoryView = Backbone.View.extend({
        
        tagName: 'div',
        className: "category-container", 

        template: JST['app/scripts/templates/CategoryView.ejs'],

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            this.content = this.$el.find('.category-content');
            this.$el.find('.category-name').on('click', {content: this.content}, this.slideCategories);

            return this;
        },

        slideCategories: function(event) {
            event.data.content.slideToggle();
        }

    });

})(client.Views);

/*global client, Backbone, JST*/

client.Views = client.Views || {};


(function (views, collections, mediator) {
    'use strict';

    views.CategoryCollectionView = Backbone.View.extend({

        cattegories_obj: {},
        el: $('#menu-container'),

        initialize: function() {
            this.$el = $('#menu-container');

            this.collection = new collections.CategoryCollection();

            this.collection.on('reset', this.afterLoad, this);			
        },

        afterLoad: function () {
            this.render();
            mediator.pub('categories-ready', this.cattegories_obj);
        },

        render: function() {
            this.$el.html("Menu");
            this.collection.each(this.addOneCategory, this);
        },
        
        addOneCategory: function(model) {
            var view = new client.Views.CategoryView({
                'model': model
            });

            this.$el.append(view.render().$el);
            this.cattegories_obj[model.get('category_name')] = view.content;
        }

    });

})(client.Views, client.Collections, Backbone.Mediator);

/*global client, Backbone*/

client.Models = client.Models || {};

(function () {
    'use strict';

    client.Models.TableModel = Backbone.Model.extend({

        defaults: {
                    orderid: "none",
                    state: "vacant",    //occupied
                    activity: "false",
                    capacity: 0,
                    waiter: "n/a",
                    xchord: 0,
                    ychord: 0
                }

    });

})();

/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.TableCollection = Backbone.Collection.extend({

        model: client.Models.TableModel,
        url: "tables.json"

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

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.TableMapModelView = Backbone.View.extend({
    
        initialize: function() {
                        this.collection = new client.Collections.TableCollection();
                        this.collection.fetch();
                        this.collection.once("sync", this.render, this);
                    },

        template: JST['app/scripts/templates/TableMapModelView.ejs'],
        
        events: {
                    "click #hidetablemap": "tableMapHide"
                },
                
        tableMapHide: function() {
                        this.el.remove();
                    },
                    
        render:  function() {
                        this.$el.append(this.template);
                        this.collection.each(this.rendermodel, this);
                    },
        
        rendermodel: function(tablemodel) {
                            var view = new client.Views.TableModelView({model: tablemodel});
                            this.$el.append(view.maprender().el);
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

                        this.collection.fetch();
                        this.collection.once("sync", this.render, this);
                    },
        
        template: JST['app/scripts/templates/TableCollectionView.ejs'],
        
        events: {
                    "click #showtablemap": "tableMapShow"
                },

        tableMapShow: function() {
                        this.$el.append(this.template);
                        var table_map = new client.Views.TableMapModelView({
                            el: $("#tablemap-container")
                        });
                    },
        
        render: function() {
                    this.collection.each(this.renderModel, this);
					
					Backbone.Mediator.pub("tables-rendered");
                },

        renderModel: function(tablemodel) {
                        var view = new client.Views.TableModelView({model: tablemodel});
                        this.$el.append(view.render().el);
                    },
                             

    });

})();

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
            "(/)table/:number" : "myTrigger"          
        },
        
        myTrigger: function(number) {
            var elem = $("#table-container").find("#table_"+ number);
                      
            $(elem).trigger("click"); //write mediator.sub to tablesview
        }
            
    });

})(client.Routers, Backbone.Mediator);


/*global client, Backbone*/

client.Models = client.Models || {};

(function (models) {
    'use strict';

    models.OrderModel = Backbone.Model.extend({
    
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
            this.url = "orders/"+ this.id +".json";
            this.save();        
        }    

    });

})(client.Models);



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


/*global client, Backbone*/

client.Models = client.Models || {};

(function (models) {
    'use strict';

    models.OrderitemModel = Backbone.Model.extend({
    	defaults: {
            name: "N/A",
            amount: 1,
            price: 0,
            status: "Not ready",
            order_id: 0
        },
        url : "order_items.json",

        saveModel: function(amount_value) {
			this.url = "order_items/" + this.id +".json";       
			this.save({wait:true}, {silent: true});
        }
    });

})(client.Models);

/*global client, Backbone*/

client.Collections = client.Collections || {};

(function (models, mediator) {
    'use strict';

    client.Collections.OrderitemsCollection = Backbone.Collection.extend({

        model: models.OrderitemModel,
        url: "order_items.json",
        order_id: 0,
        sum: 0,
		
        initialize: function() {
            mediator.subscribeOnce("order-create", this.changeOrderId, this);
        },

        parse: function(response) {
            var result = [],
				i;

            for (i = 0; i < response.length; i++) {
				if (response[i].order_id === this.order_id) {
					result.push(response[i]);
				}
            }

            return result;
        },

        changeOrderId: function(changed_id) {
            this.order_id = changed_id;
            this.each(this.setOrderId, this);
        },
        
        setOrderId: function(item) {
            item.set('order_id', this.order_id);
            item.saveModel();
        }

    });

})(client.Models, Backbone.Mediator);

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function (views, mediator) {
    views.OrderitemView = Backbone.View.extend({
        id: "order_item",
        className: "order_item",
		
        template: JST['app/scripts/templates/OrderItem.ejs'],

        initialize: function() {
            this.model.on("destroy", this.removeView, this);
            mediator.sub('matching-items', this.incrMatchingAmount, this);
        },

        events: {
                "click #add_amount": "incrAmount",
                "click #remove_amount": "decrAmount"
        },

        render: function() {
            var price = this.model.get('price'),
                amount = this.model.get('amount'),
                difference_price = price * amount;

            this.$el.html(this.template(this.model.toJSON()));

            this.publisher("add", difference_price);

            return this;
        },

        publisher: function(operation, difference) {
             mediator.pub("amount", {
                                            "operation": operation,
                                            "difference": difference
                                            }
            );
        },

        incrAmount: function(e) {
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            
            var amount = this.model.get('amount'),
                price = this.model.get('price'),
                decr_block = this.$el.find('#remove_amount');
                
            amount++;

            this.saveAmount(amount);
            this.publisher("add", price);

            decr_block.removeClass('close_item');
        },
        
        incrMatchingAmount: function(changing_model) {
            if (this.model === changing_model) {
                this.incrAmount();
            }
        },
		
        decrAmount: function(e) {
            e.stopPropagation();
            e.preventDefault();
            var amount = this.model.get('amount'),
                price = this.model.get('price'),
                decr_block = this.$el.find('#remove_amount');
                
            amount--;

            this.saveAmount(amount);

            if (amount > 0) {
                    this.publisher("sub", price);
            } else if (amount === 0) {
                    this.publisher("sub", price);
                    decr_block.addClass('close_item');
            } else if (amount < 0){
                    this.model.url = "order_items/" + this.model.id +".json";
                    this.model.destroy({wait: true});
            }
        },

        removeView: function() {
            this.remove();
        },

        saveAmount: function(amount_value) {
                this.model.set('amount', amount_value);             
                this.model.saveModel(amount_value);
                this.$el.find('#order_item_amount').html(this.model.get('amount'));
        }

    });
})(client.Views, Backbone.Mediator);

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function (models, collections, views, mediator) {

    views.OrderitemcollectionView = Backbone.View.extend({

        template: JST['app/scripts/templates/OrderItemCollection.ejs'],

        initialize: function() {
            mediator.sub('order-show', this.preparingCollection, this);
            mediator.sub("orderitem-add", this.addItemFromMenu, this);
            mediator.sub("amount", this.changeSum, this);
        },

        preparingCollection: function (order_data) {
            this.el = order_data.elem;
            this.el.addClass('for_order_items');
            
            if (this.collection) {
                this.collection.reset();
                delete this.collection;
            }
            this.collection = new collections.OrderitemsCollection();

            this.renderSum();

            this.collection.once("reset", this.renderCollectionFromDB, this);

            if (!order_data.is_new) {
                this.preloader_block.show();                                          
                this.collection.order_id = order_data.order_id;
                this.collection.fetch({reset: true});
            }
        },

        renderSum: function() {
            this.el.html(this.template({sum: this.collection.sum}));
            this.preloader_block = this.el.find('#loader_block');
            this.preloader_block.hide();
        },

        addItemFromMenu: function(item_data) {
            var checking_model = this.collection.findWhere({name: item_data.name});   

            console.log("1 -->");
            console.log(this.collection);
            console.log("2 -->");
            console.log(checking_model);

            if (checking_model) {
                mediator.pub('matching-items', checking_model);
            } else {
                var item_model = new models.OrderitemModel({
                                                    name: item_data.name,
                                                    price: item_data.price,
                                                    order_id: this.collection.order_id
                });

                this.collection.once('add', this.addItemToDB, this);
                this.collection.add(item_model);
            }
        },

        addItemToDB: function(item) {
            this.preloader_block.show();    

            item.once('sync', this.renderItem, this);
            item.save({wait:true});
        },
        
        renderItem: function(item) {
            var view = new views.OrderitemView({ model: item });
			
            mediator.pub("change-order-id");

            this.el.prepend(view.render().el);

            this.preloader_block.hide();
        },
        
        renderItemFromDB: function(item) {
			var view = new views.OrderitemView({ model: item });
			this.el.prepend(view.render().el);
        },
        
        renderCollectionFromDB: function() {
            this.collection.each(this.renderItemFromDB, this);

            this.preloader_block.hide();
        },

        changeSum: function(changing_data) {
            var sum = this.collection.sum,
                changing = {
                            "add": function() {
                                        sum += Number(changing_data.difference);
                                   },
                            "sub": function() {
                                        sum -= Number(changing_data.difference);
                                   }
                };

            changing[changing_data.operation]();
            this.collection.sum = sum;

            sum = sum.toFixed(2);
            this.el.find("#sum").html(sum + " $");
        }
    });

})(client.Models, client.Collections, client.Views, Backbone.Mediator);

/*global client, Backbone*/

client.Models = client.Models || {};

(function () {
    'use strict';

    client.Models.MenuItemDescModel = Backbone.Model.extend({
	       defaults: {
				name: 'N/A',
				description : 'N/A',
				uri_image: 'N/A'
        }
    });

})();

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.MenuItemDescView = Backbone.View.extend({

        template: JST['app/scripts/templates/MenuItemDesc.ejs'],
        events: {
            'click': 'del'
        },

        del: function(){
            this.$el.remove();
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        }

    });

})();

/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.MenuItemDescCollection = Backbone.Collection.extend({
       initialize: function() {		
		//            this.fetch();

            this.add( new client.Models.MenuItemDescModel( { "id": "1"
				,"name": "Capuccino"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs." 
				, "uri_image": "images/1.jpg"} ) );
            this.add( new client.Models.MenuItemDescModel( { "id": "2"
				,"name": "Ice Cream"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				,  "uri_image": "images/2.jpg"} ) );
            this.add( new client.Models.MenuItemDescModel( { "id": "3"
				, "name": "Cream Pie"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				,  "uri_image": "images/3.jpg"} ) );
            this.add( new client.Models.MenuItemDescModel( { "id": "4"
				,  "name": "Soup"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				, "uri_image": "images/4.jpg"} ) );
            this.add( new client.Models.MenuItemDescModel( { "id": "5"
				, "name": "Esspreso"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				, "uri_image": "images/5.jpg"} ) );
            this.add( new client.Models.MenuItemDescModel( { "id": "6"
				,  "name": "Cheese"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				, "uri_image": "images/6.jpg"} ) );          
			this.add( new client.Models.MenuItemDescModel( { "id": "7"
				,  "name": "Mochitto"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				, "uri_image": "images/6.jpg"}));
            this.add( new client.Models.MenuItemDescModel( { "id": "8"
				,  "name": "Green Mexican"
				,"description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				, "uri_image": "images/7.jpg"}));
            this.add( new client.Models.MenuItemDescModel( { "id": "9"
				,  "name": "B-52"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				, "uri_image": "images/8.jpg3"})); 
        }, 
		

        model: client.Models.MenuItemDescModel//,
 //       url: 'menu_item_descs.json'
        });

})();


/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.MenuItemDescCollView = Backbone.View.extend({
	    initialize: function() {
//	this.element = $('#test');
        this.collection = new client.Collections.MenuItemDescCollection();
	    Backbone.Mediator.sub ( 'addMenuItemDesc', this.render /*createDesc*/, this );
		},
			
		element: {},
        id: 0,

			
			render: function( menu_item ) {
				console.log( menu_item );
				this.element = $(menu_item.el);
                this.id = menu_item.id;
				this.collection.each( this.checkName, this );
			},

            checkName: function(model){
                if(model.get('id')== this.id){
                    this.addItem(model);
                } else {
                    console.log('Description doesn"t create');
                }
    },
			
			
			addItem: function( desc ) {
                console.log(this.element);
				var view = new client.Views.MenuItemDescView( { model: desc } );

//				this.element.append( view.render().$el );
				this.element.html( view.render().$el ); // WARN!!
        }

    });
})();
