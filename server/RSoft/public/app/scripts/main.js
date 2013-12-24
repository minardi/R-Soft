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


        console.log('Hello from Backbone!');
  /*      
        var menu_item = new client.Views.MenuItemCollectionView(), 
			description = new client.Views.MenuItemDescCollView(),		
            categories = new client.Views.CategoryCollectionView();
     
            orderview = new client.Views.OrderView({
>>>>>>> a812169ed4fde0795de689c26e9d8309bc627d73
                el: $("#order-container"),
                model: new client.Models.OrderModel()
            }),        
        
            tables = new client.Views.TableCollectionView({
                el: $("#table-container")
            });
    */           
        
        /*Backbone.Mediator.sub('order-show', function(order_data) {
            var go_items = new client.Views.OrderitemcollectionView({el: order_data.elem}, {is_new: order_data.is_new});
            if (!order_data.is_new) {
                go_items.collection.order_id = order_data.order_id;
            }
        }, this);*/

        
        Backbone.Mediator.sub("tables-rendered", function() {
            var route = new client.Routers.TablesRouter();
            Backbone.history.start({
                //pushState: true
            });
        });
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
__p += '<div class=\'category-name\'>\n\t' +
((__t = ( category_name )) == null ? '' : __t) +
'\n</div>';

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
'</span>\n</div>\n<div id="loader_block" class="preloader_block">\n  \t<img src="app/images/preloader2.gif" class="preloader">\n  \t<div class="helper"></div>\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/TableCollectionView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\n\n';

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
			console.log( this.model.get( 'name' ) + ' sent to Order' );
            Backbone.Mediator.pub( 'orderitem-add', { 'name': this.model.get( 'name' ), 'price': this.model.get( 'price' ) } );
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
			if(element){
				element.append( view.render().el );
			} else {
				console.log( "The category: " + item.get( 'category') + "didn't create" );			
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
        view: undefined
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
		    this.add(new models.CategoryModel({'category_name': 'Drinks'}));
            this.add(new models.CategoryModel({'category_name': 'Desserts'}));
            this.add(new models.CategoryModel({'category_name': 'Entrees'}));
            this.add(new models.CategoryModel({'category_name': 'Sides'}));
            this.add(new models.CategoryModel({'category_name': 'Bar'}));
//            this.fetch({reset: true});
        }

    });

})(client.Collections, client.Models);

/*global client, Backbone, JST*/

client.Views = client.Views || {};


(function (views) {
    'use strict';

    views.CategoryView = Backbone.View.extend({

        model:undefined,
        tagName: 'div',
        className: "category-container",        
        template: JST['app/scripts/templates/CategoryView.ejs'],
        
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
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

//            this.collection.on('reset', this.afterLoad, this);
			this.afterLoad();
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
            this.cattegories_obj[model.get('category_name')] = view.$el;			
            this.$el.append(view.render().$el);
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
                        if (this.model.get("state") === "vacant") {
                            return "table_vacant_unactive";
                        } else {
                            return "table_occupied_unactive";
                        };
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
                                            "orderid": this.model.get("orderid"),
                                            "isnew": true,
                                            "tableid": this.model.get("id")
                                        };
                        } else {
                            orderidinfo = {
                                            "orderid": Number(this.model.get("orderid")),
                                            "isnew": false,
                                            "tableid": this.model.get("id"),
                                        };
                        }
                        
                        Backbone.Mediator.pub("table-active", orderidinfo);
                        Backbone.Mediator.pub("changeactivity", this.model.id);
                        //console.log("Event 'table-active' published");    
                        
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
                            console.log(ordergetid);
                            this.model.set({orderid: ordergetid, state: "occupied"});
                            this.el.className = "table_occupied_active";
                            this.model.url = "tables/" + this.model.id + ".json";
                            this.model.save({silent: "true"});
                        }
                    },

        tableRelease: function() {
                        if (this.model.get("activity") === "true") {
                            this.model.set({orderid: "none", state: "vacant", activity: "false"});
                            this.el.className = "table_vacant_unactive";
                            this.model.url = "tables/" + this.model.id + ".json";
                            this.model.save({silent: "true"});
                        }
                    },

        render: function(model) {
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

                        this.collection.fetch();
                        this.collection.once("sync", this.render, this);                       
                    },

        render: function() {                  
                    this.collection.each(this.rendermodel, this);
                   
                    Backbone.Mediator.pub("tables-rendered");
                },

        rendermodel: function(tablemodel) {
                        var view = new client.Views.TableModelView({model: tablemodel});
                        this.$el.append(view.render().el);
                    }

    });

})();

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

            /*
            this.navigate("table" + table.tableid
                //, {trigger: true}
            ); 
            */
          
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


/*global client, Backbone*/

client.Models = client.Models || {};

(function (models) {
    'use strict';

    models.OrderModel = Backbone.Model.extend({

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
                
                this.$el.find("#order_items").css('visibility', 'visible');
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
                el.css('visibility', 'visible');                
                
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

(function () {
    'use strict';

    client.Models.OrderitemModel = Backbone.Model.extend({
    	defaults: {
            name: "N/A",
            amount: 1,
            price: 0,
            status: "Not ready",
            order_id: 0
        },
        url : "order_items.json",

        saveModel: function(amount_value) {
                console.log('In model saving');
                this.url = "order_items/" + this.id +".json";       
/*?*/           this.save(/*{amount: amount_value}, {patch: true}*/{wait:true}, {silent: true});
        }
    });

})();

/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.OrderitemsCollection = Backbone.Collection.extend({

        model: client.Models.OrderitemModel,
        url: "order_items.json",
        order_id: 0,
        sum: 0,
        initialize: function() {
            Backbone.Mediator.subscribeOnce("order-create", this.changeOrderId, this);
        },

        parse: function(response) {
            var result = [];

            for (var i=0; i<response.length;i++) {

                    if (response[i].order_id === this.order_id) {
                        result.push(response[i]);
                    }
            }

            console.log("-----------------");
            console.log(result);
            console.log("-----------------");

            return result;
        },

        changeOrderId: function(changed_id) {
            this.order_id = changed_id;
            this.each(this.setOrderId, this);
        },
        
        setOrderId: function(item) {
            item.set('order_id', this.order_id);
            item.url = "order_items/" + item.id +".json";                
            item.save({wait:true}, {silent: true});
        }

    });

})();

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    client.Views.OrderitemView = Backbone.View.extend({
        id: "order_item",
        className: "order_item",
        template: JST['app/scripts/templates/OrderItem.ejs'],

        initialize: function() {
            //this.model.on("change", this.saveAmount, this);
            this.model.on("destroy", this.removeView, this);
            Backbone.Mediator.sub('matching-items', this.incrMatchingAmount, this);
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
             Backbone.Mediator.pub("amount", {
                                            "operation": operation,
                                            "difference": difference
                                            }
            );
        },

        incrAmount: function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            var amount = this.model.get('amount'),
                price = this.model.get('price'),
                decr_block = this.$el.find('#remove_amount');
                
            amount++;

            this.saveAmount(amount);
            this.publisher("add", price);

            decr_block.removeClass('close_item');
        },
        
        incrMatchingAmount: function(changing_model) {
            var amount = changing_model.get('amount'),
                price = changing_model.get('price'),
                decr_block = this.$el.find('#remove_amount');
                
            amount++;

            this.saveAmount(amount, changing_model);
            this.publisher("add", price);
            
            decr_block.removeClass('close_item');
            this.$el.find('#order_item_amount').html(this.model.get('amount'));
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
                    //this.preloader_block.show();
                    console.log('This model:');
                    console.dir(this.model);
                    this.model.url = "order_items/" + this.model.id +".json";
                    this.model.destroy({wait: true});
            }
        },

        removeView: function() {
            this.remove();
            console.log('Was destroy');
            //this.preloader_block.hide();
        },

        saveAmount: function(amount_value, changing_model) {
            //this.preloader_block.show();

            if (!changing_model) {
                this.model.set('amount', amount_value);             
                this.model.saveModel(amount_value);
                this.$el.find('#order_item_amount').html(this.model.get('amount'));
            } else {
                changing_model.set('amount', amount_value);              
                changing_model.saveModel(amount_value);
            }
            
            //this.preloader_block.hide();
        }

    });
})();

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {

    client.Views.OrderitemcollectionView = Backbone.View.extend({

        template: JST['app/scripts/templates/OrderItemCollection.ejs'],

        initialize: function() {
            var global_this = this;

            Backbone.Mediator.sub('order-show', 
                                  function(order_data) {
										this.el = order_data.elem;
                                        this.el.addClass('for_order_items');
										
										if (this.collection) {
											this.collection.reset();
											delete this.collection;
										}
                                        this.collection = new client.Collections.OrderitemsCollection();
										
                                        this.renderSum();
                                        this.collection.once("reset", this.renderCollectionFromDB, this);

                                        if (!order_data.is_new) {
											console.log("---------in fetch--------");											
                                            this.collection.order_id = order_data.order_id;
                                            this.collection.fetch({reset: true});

                                        }
                                        
                                  }, 
                                  this);

            
            Backbone.Mediator.sub("orderitem-add", this.addDataToModel, this);
            Backbone.Mediator.sub("amount", this.changeSum, this);
        },

        renderSum: function() {
            this.el.html(this.template({sum: this.collection.sum}));
            this.preloader_block = this.el.find('#loader_block');
            this.preloader_block.hide();
        },

        addDataToModel: function(item_data) {
            var checking_model = this.collection.findWhere({'name': item_data.name});

            if (checking_model) {
                console.log(checking_model);
                Backbone.Mediator.pub('matching-items', checking_model);
            } else {
                this.collection.once('add', this.addItemToDB, this);

                this.collection.add(new client.Models.OrderitemModel({
                        "name": item_data.name,
                        "price": item_data.price,
                        "order_id": this.collection.order_id
                    }));
            }
        },

        addItemToDB: function(item) {
            this.preloader_block.show();    

            console.log('Begin adding item TO DB...');

            item.once('sync', this.renderItem, this);
            item.save({wait:true});
        },
        
        renderItem: function(item) {
            var view = new client.Views.OrderitemView({ model: item });
			
			Backbone.Mediator.pub("change-order-id");
			
            this.el.prepend(view.render().el);
            this.preloader_block.hide();

            console.log(this.collection);
            console.log('Finish adding item TO DB!');
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
            this.el.find("#sum").html(String(sum));
        },
        
        addItemsFromDB: function(item) {
                var view = new client.Views.OrderitemView({ model: item });
                this.el.prepend(view.render().el);
        },
        
        renderCollectionFromDB: function() {
            this.preloader_block.show();

            console.log('Begin adding items FROM DB...');
            this.collection.each(this.addItemsFromDB, this);
            console.log(this.collection);
            console.log('Finish adding items FROM DB!');

            this.preloader_block.hide();
        }
    });

})();

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
				this.element.append( view.render().$el );
        }

/*		
        createDesc: function( menu_item ) { //cantains name and el. of menu_item
            var the_model = this.collection.where( menu_item.name );
			console.log(the_model);
			if ( the_model != [] ) {
				var view = new client.Views.MenuItemDescView( { model: this.collection[0] } );
				menu_item.$el.append( view.render().el );				
			} else {
				console.log("description for the menu_item is not found!");
			}
        }*/
    });
})();
