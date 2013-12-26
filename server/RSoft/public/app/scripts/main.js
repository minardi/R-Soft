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
__p += '<div class=\'category-name\'>\r\n\t' +
((__t = ( category_name )) == null ? '' : __t) +
'\r\n</div>\r\n<div class=\'category-content\'></div>';

}
return __p
};

this["JST"]["app/scripts/templates/MenuItem.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = "menu_item_tpl">\r\n\t<div class = "scale_cont">\r\n\t\t<div class = "menu_item_name">' +
((__t = ( name )) == null ? '' : __t) +
'</div>\r\n\t\t<div class = "menu_item_price">' +
((__t = ( price )) == null ? '' : __t) +
' $</div>\r\n\t\t</div>\r\n\t<div class = "add_to_order"><img src="images/blue_arrow_right.png" alt="add_to_order"></div>\r\n</div>\r\n\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/templates/MenuItemDesc.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = \'desc\' >\n    <div class = "desc_name">' +
((__t = ( name )) == null ? '' : __t) +
'</div>\n    <div class = "desc_description">' +
((__t = ( description )) == null ? '' : __t) +
'</div><br>\n\t<div class = "desc_pic"><img src="images/' +
((__t = ( id )) == null ? '' : __t) +
'.jpg"></div>\n</div>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/Order.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\r\n    <p id="order_head"> Order</p>\r\n\r\n    <div id="order_items" class="order_items">\r\n    </div>\r\n    \r\n    <input type = "button" id = "order_close" value = "Close order">  </input>\r\n';

}
return __p
};

this["JST"]["app/scripts/templates/OrderItem.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="order_item_name">' +
((__t = (name)) == null ? '' : __t) +
'</div>\r\n<div id="add_amount" class="add_amount"><br/></div>\r\n<div id="order_item_amount" class="order_item_amount">' +
((__t = (amount)) == null ? '' : __t) +
'</div>\r\n<div id="remove_amount" class="remove_amount"><br/></div>\r\n<div class="order_item_price">' +
((__t = (price)) == null ? '' : __t) +
'</div>\r\n<span class="order_item_status">' +
((__t = (status)) == null ? '' : __t) +
'</span>';

}
return __p
};

this["JST"]["app/scripts/templates/OrderItemCollection.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="block_sum" class="sum">\r\n  \tOrder amount: <span id="sum">' +
((__t = (sum)) == null ? '' : __t) +
'</span>\r\n</div>\r\n<div id="loader_block" class="preloader_block">\r\n  \t<img src="app/images/preloader2.gif" class="preloader">\r\n  \t<div class="helper"></div>\r\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/TableCollectionView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="tablemap-container"></div>\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/templates/TableMapModelView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="bgdark" class="darkbg"></div>\r\n<div id="tablemap" class="table_map">\r\n    <input type="button" id="hidetablemap" value="Hide Map">\r\n</div>';

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
/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function ( views, mediator ) {
    'use strict';

    views.MenuItemView = Backbone.View.extend({

        template: JST[ 'app/scripts/templates/MenuItem.ejs' ],
        events: {
            'click .add_to_order': 'sendMenuItemToOrder',
			'click .menu_item_name': 'addDescView'
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },

        sendMenuItemToOrder : function() {
            mediator.pub( 'orderitem-add', { 'name': this.model.get( 'name' ), 'price': this.model.get( 'price' ) } );
        },
		
		addDescView: function(){
			mediator.pub('addMenuItemDesc', { 'id': this.model.get( 'description' ), 'el': this.el } );
		}
    });

})( client.Views, Backbone.Mediator );

/*global client, Backbone*/

client.Models = client.Models || {};

(function ( models ) {
    'use strict';

    models.MenuItemModel = Backbone.Model.extend({
        defaults: {
            category : 'N/A',
            name : 'N/A',
            description : 'N/A',
            price : 'N/A'
        }
    });

})( client.Models );

/*global client, Backbone*/

client.Collections = client.Collections || {};

(function ( collections, models ) {
    'use strict';

    collections.MenuItemCollection = Backbone.Collection.extend({
        initialize: function() {
            this.fetch();
            console.log("menu_item fetch");
			},
			
		model: models.MenuItemModel,
		url: 'menu_items.json'
    });
	
})( client.Collections, client.Models );

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function ( views, collections, mediator ) {
    'use strict';

    views.MenuItemCollectionView = Backbone.View.extend({
        initialize: function() {
            this.collection = new collections.MenuItemCollection();
            mediator.subscribeOnce ( 'categories-ready', this.render, this );
            this.elements = {};
        },

        addItem: function( item ) {
            var view = new views.MenuItemView( { model: item } ),
                key = item.get( 'category' ),
                element = this.elements[ key ];
				
			if(element) {
				element.append( view.render().el );
			} else {
				console.warn( "The category: " + item.get( 'category') + "didn't create" );			
			}
        },

        render: function( elements ) {
            this.elements = elements;
            this.collection.each( this.addItem, this );
        }
    });

})( client.Views, client.Collections, Backbone.Mediator );

/*global client, Backbone*/

client.Models = client.Models || {};

(function (models) {
    'use strict';

    models.CategoryModel = Backbone.Model.extend({
    
        defaults: {
            category_name: 'noname'
        }
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
			this.url = "order_items/" + this.id +".json";       
			this.save({wait:true}, {silent: true});
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

})();

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    client.Views.OrderitemView = Backbone.View.extend({
        id: "order_item",
        className: "order_item",
		
        template: JST['app/scripts/templates/OrderItem.ejs'],

        initialize: function() {
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
                    console.dir(this.model);
                    this.model.url = "order_items/" + this.model.id +".json";
                    this.model.destroy({wait: true});
            }
        },

        removeView: function() {
            this.remove();
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
            Backbone.Mediator.sub('order-show',
								//in method!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
                this.collection.add(//in variable
						new client.Models.OrderitemModel({
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

(function ( models ) {
    'use strict';

    models.MenuItemDescModel = Backbone.Model.extend({
        defaults: {
            name: 'N/A',
			description : 'N/A',
			uri_image: 'N/A'
        }
    });

})( client.Models );

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function ( views ) {
    'use strict';

    views.MenuItemDescView = Backbone.View.extend({

        template: JST['app/scripts/templates/MenuItemDesc.ejs'],
        events: {
            'click': 'deleteEl'
        },

        deleteEl: function(){
            this.$el.remove();
        },

        render: function() {
                this.$el.html( this.template( this.model.toJSON() ) );
                return this;
        }

    });

})( client.Views );

/*global client, Backbone*/

client.Collections = client.Collections || {};

(function ( collections, models ) {
    'use strict';

    collections.MenuItemDescCollection = Backbone.Collection.extend({
       initialize: function() {		
            this.add( new models.MenuItemDescModel( { "id": "1"
				,"name": "Capuccino"
				, "description": "Frothed milk and a shot of espresso, topped with a touch of cinnamon."
				, "uri_image": "images/1.jpg"} ) );
           this.add( new models.MenuItemDescModel( { "id": "2"
               , "name": "Esspreso"
               , "description": "A type of coffee prepared from a blend of coffee beans and produced when pressed through a fine filter under high pressure."
               , "uri_image": "images/2.jpg"} ) );

            this.add( new models.MenuItemDescModel( { "id": "3"
				,"name": "Ice Cream"
				, "description": "Our delicious traditional vanilla ice cream with a chocolate fudge sauce rippled throughout."
				,  "uri_image": "images/3.jpg"} ) );
            this.add( new models.MenuItemDescModel( { "id": "4"
				, "name": "Cream Pie"
				, "description": "Using fresh apples, a homemade pie crust recipe, and the perfect blend of spices; this is the apple pie that is true delight in every forkful."
				,  "uri_image": "images/4.jpg"} ) );
            this.add( new models.MenuItemDescModel( { "id": "5"
				,  "name": "Cheese"
				, "description": "Some description, some description, ect.."
				, "uri_image": "images/5.jpg"} ) );

            this.add( new models.MenuItemDescModel( { "id": "6"
				,  "name": "Green Mexican"
				, "description": "Some coctails description."
				, "uri_image": "images/6.jpg"} ) );
        }, 
		
        model: client.Models.MenuItemDescModel
        });

})( client.Collections, client.Models );


/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function (  views, collections, mediator  ) {
    'use strict';


    views.MenuItemDescCollView = Backbone.View.extend({
	    initialize: function() {
            this.collection = new collections.MenuItemDescCollection();
	        mediator.sub( 'addMenuItemDesc', this.render, this );
		},
			
		element: {},
        id: 0,


		render: function( menu_item ) {
            var the_model = this.collection.findWhere( { 'id': menu_item.id } );
            this.element = $(menu_item.el);
            console.log(the_model);
            this.addItem(  the_model );
		},


		addItem: function( model ) {
			var view = new client.Views.MenuItemDescView( { "model": model } );

			this.element.prepend( view.render().$el );
        }
    });

})( client.Views, client.Collections, Backbone.Mediator );
