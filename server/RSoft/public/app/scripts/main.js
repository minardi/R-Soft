window.client={Models:{},Collections:{},Views:{},Routers:{},init:function(){"use strict";new client.Views.MenuItemCollectionView,new client.Views.CategoryCollectionView,new client.Views.OrderView({el:$("#order-container"),model:new client.Models.OrderModel}),new client.Views.TableCollectionView({el:$("#table-container")});Backbone.Mediator.sub("order-show",function(a){var b=new client.Views.OrderitemcollectionView({el:a.elem});isNaN(a.order_id)||(b.collection.order_id=a.order_id)},this),Backbone.Mediator.sub("tables-rendered",function(){new client.Routers.TablesRouter;Backbone.history.start({})})}},$(document).ready(function(){"use strict";client.init()}),this.JST=this.JST||{},this.JST["app/scripts/templates/Category.ejs"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<div class='category-name'>\r\n	"+(null==(__t=category_name)?"":__t)+"\r\n</div>\r\n\r\n<div class='category-content'>\r\n</div>\r\n\r\n";return __p},this.JST["app/scripts/templates/CategoryCollection.ejs"]=function(obj){obj||(obj={});{var __p="";_.escape}with(obj)__p+="<p>Your content here.</p>\r\n\r\n";return __p},this.JST["app/scripts/templates/CategoryView.ejs"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<div class='category-name'>\r\n	"+(null==(__t=category_name)?"":__t)+"\r\n</div>\r\n<div class='category-content'></div>";return __p},this.JST["app/scripts/templates/CategoryViewCollection.ejs"]=function(obj){obj||(obj={});{var __p="";_.escape}with(obj)__p+="<p>Your content here.</p>\r\n\r\n";return __p},this.JST["app/scripts/templates/MenuItem.ejs"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+='<div class = "menu_item_tpl">\r\n	<div class = "menu_item_name">'+(null==(__t=name)?"":__t)+'</div>\r\n	<div class = "menu_item_description">'+(null==(__t=description)?"":__t)+'</div>\r\n	<div class = "menu_item_price">'+(null==(__t=price)?"":__t)+' $</div>\r\n	<div class = "add_to_order"><img src="images/blue_arrow_right.png" alt="add_to_order"></div>\r\n</div>\r\n\r\n\r\n';return __p},this.JST["app/scripts/templates/Order.ejs"]=function(obj){obj||(obj={});{var __p="";_.escape}with(obj)__p+='\r\n    <p id="order_head"> Order</p>\r\n\r\n    <div id="order_items" class="order_items">\r\n    </div>\r\n    \r\n    <input type = "button" id = "order_close" value = "Close order">  </input>\r\n';return __p},this.JST["app/scripts/templates/OrderItem.ejs"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+='<div class="order_item_name">'+(null==(__t=name)?"":__t)+'</div>\r\n<div id="add_amount" class="add_amount"><br/></div>\r\n<div id="order_item_amount" class="order_item_amount">'+(null==(__t=amount)?"":__t)+'</div>\r\n<div id="remove_amount" class="remove_amount"><br/></div>\r\n<div class="order_item_price">'+(null==(__t=price)?"":__t)+'</div>\r\n<span class="order_item_status">'+(null==(__t=status)?"":__t)+"</span>";return __p},this.JST["app/scripts/templates/OrderItemCollection.ejs"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+='<div id="block_sum" class="sum">\r\n  	Order amount: <span id="sum">'+(null==(__t=sum)?"":__t)+'</span>\r\n</div>\r\n<div id="loader_block" class="preloader_block">\r\n  	<img src="app/images/preloader2.gif" class="preloader">\r\n  	<div class="helper"></div>\r\n</div>';return __p},this.JST["app/scripts/templates/TableCollectionView.ejs"]=function(obj){obj||(obj={});{var __p="";_.escape}with(obj)__p+="<p>Your content here.</p>\r\n\r\n";return __p},this.JST["app/scripts/templates/TableModelView.ejs"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+=(null==(__t=id)?"":__t)+"\r\n\r\n";return __p},client.Views=client.Views||{},function(){"use strict";client.Views.MenuItemView=Backbone.View.extend({template:JST["app/scripts/templates/MenuItem.ejs"],events:{"click .add_to_order":"addMediatorPub"},render:function(){return this.$el.html(this.template(this.model.toJSON())),this},addMediatorPub:function(){Backbone.Mediator.pub("addOrderItem",{name:this.model.get("name"),price:this.model.get("price")})}})}(),client.Models=client.Models||{},function(){"use strict";client.Models.MenuItemModel=Backbone.Model.extend({defaults:{category:"N/A",name:"N/A",description:"N/A",price:"N/A"}})}(),client.Collections=client.Collections||{},function(){"use strict";client.Collections.MenuItemCollection=Backbone.Collection.extend({initialize:function(){this.fetch()},model:client.Models.MenuItemModel,url:"menu_items.json"})}(),client.Views=client.Views||{},function(){"use strict";client.Views.MenuItemCollectionView=Backbone.View.extend({initialize:function(){this.collection=new client.Collections.MenuItemCollection,Backbone.Mediator.subscribeOnce("categories-ready",this.render,this),this.elements={}},addItem:function(a){var b=new client.Views.MenuItemView({model:a}),c=a.get("category"),d=this.elements[c];d.append(b.render().el)},render:function(a){this.elements=a,this.collection.each(this.addItem,this)}})}(),client.Models=client.Models||{},function(a){"use strict";a.CategoryModel=Backbone.Model.extend({defaults:{category_name:"noname"},view:void 0})}(client.Models),client.Collections=client.Collections||{},function(a,b){"use strict";a.CategoryCollection=Backbone.Collection.extend({model:b.CategoryModel,url:"/categories",initialize:function(){this.fetch({reset:!0})}})}(client.Collections,client.Models),client.Views=client.Views||{},function(a){"use strict";a.CategoryView=Backbone.View.extend({model:void 0,tagName:"div",className:"category-container",template:JST["app/scripts/templates/CategoryView.ejs"],render:function(){return this.$el.html(this.template(this.model.toJSON())),this}})}(client.Views),client.Views=client.Views||{},function(a,b,c){"use strict";a.CategoryCollectionView=Backbone.View.extend({cattegories_obj:{},el:$("#menu-container"),initialize:function(){this.$el=$("#menu-container"),this.collection=new b.CategoryCollection,this.collection.on("reset",this.afterLoad,this)},afterLoad:function(){this.render(),c.pub("categories-ready",this.cattegories_obj)},render:function(){this.$el.html("Menu"),this.collection.each(this.addOneCategory,this)},addOneCategory:function(a){var b=new client.Views.CategoryView({model:a});this.cattegories_obj[a.get("category_name")]=b.$el,this.$el.append(b.render().$el)}})}(client.Views,client.Collections,Backbone.Mediator),client.Models=client.Models||{},function(){"use strict";client.Models.TableModel=Backbone.Model.extend({defaults:{orderid:"none",state:"vacant",activity:"false",capacity:"n/a",waiter:"n/a"}})}(),client.Collections=client.Collections||{},function(){"use strict";client.Collections.TableCollection=Backbone.Collection.extend({model:client.Models.TableModel,url:"tables.json"})}(),client.Views=client.Views||{},function(){"use strict";client.Views.TableModelView=Backbone.View.extend({initialize:function(){this.model.on("change",this.render,this),Backbone.Mediator.sub("order-create",this.tableOccupy,this),Backbone.Mediator.sub("order-close",this.tableRelease,this),Backbone.Mediator.sub("changeactivity",this.tableActivity,this)},className:function(){return"vacant"===this.model.get("state")?"table_vacant_unactive":"table_occupied_unactive"},template:JST["app/scripts/templates/TableModelView.ejs"],events:{click:"tableChoose"},tableActivity:function(a){this.model.id!=a&&("table_vacant_active"===this.el.className&&(this.el.className="table_vacant_unactive"),"table_occupied_active"===this.el.className&&(this.el.className="table_occupied_unactive"),this.model.set("activity","false"))},tableChoose:function(a){var b;b="none"===this.model.get("orderid")?{orderid:this.model.get("orderid"),isnew:!0,tableid:this.model.get("id")}:{orderid:Number(this.model.get("orderid")),isnew:!1,tableid:this.model.get("id")},Backbone.Mediator.pub("table-active",b),Backbone.Mediator.pub("changeactivity",this.model.id),this.model.set("activity","true"),"table_vacant_unactive"===this.el.className&&(this.el.className="table_vacant_active"),"table_occupied_unactive"===this.el.className&&(this.el.className="table_occupied_active"),a.stopPropagation()},tableOccupy:function(a){"true"===this.model.get("activity")&&(console.log(a),this.model.set({orderid:a,state:"occupied"}),this.el.className="table_occupied_active",this.model.url="tables/"+this.model.id+".json",this.model.save({silent:"true"}))},tableRelease:function(){"true"===this.model.get("activity")&&(this.model.set({orderid:"none",state:"vacant",activity:"false"}),this.el.className="table_vacant_unactive",this.model.url="tables/"+this.model.id+".json",this.model.save({silent:"true"}))},render:function(){return this.$el.html(this.template(this.model.toJSON())),this}})}(),client.Views=client.Views||{},function(){"use strict";client.Views.TableCollectionView=Backbone.View.extend({initialize:function(){this.collection=new client.Collections.TableCollection,this.collection.fetch(),this.collection.once("sync",this.render,this)},render:function(){this.collection.each(this.rendermodel,this),Backbone.Mediator.pub("tables-rendered")},rendermodel:function(a){var b=new client.Views.TableModelView({model:a});this.$el.append(b.render().el)}})}(),client.Models=client.Models||{},function(){"use strict";client.Models.OrderModel=Backbone.Model.extend({initialize:function(){},defaults:{status:"opened"},saveNew:function(){this.url="orders.json",this.save()},existFetch:function(a){this.url="orders/"+a+".json",this.fetch()},saveClosed:function(){this.url="orders/"+this.id+".json",this.save()}})}(),client.Views=client.Views||{},function(){"use strict";client.Views.OrderView=Backbone.View.extend({initialize:function(){this.$el.html(this.template()),Backbone.Mediator.sub("table-active",this.universalShow,this)},events:{"click #order_close":"close"},template:JST["app/scripts/templates/Order.ejs"],universalShow:function(a){a.isnew?this.newCreate():this.existRender(a)},newCreate:function(){this.model=new client.Models.OrderModel,this.$el.find("#order_items").css("visibility","visible"),this.$el.find("#order_close").css("visibility","hidden"),this.newPub()},newPub:function(){var a=this.$el.find("#order_items"),b="",c={order_id:b,elem:a,is_new:!0};Backbone.Mediator.subscribeOnce("orderitem-add",this.orderSave,this),Backbone.Mediator.pub("order-show",c)},showSyncModel:function(){this.$el.find("#order_close").css("visibility","visible")},existRender:function(a){var b,c=this.$el.find("#order_items");this.model=new client.Models.OrderModel,this.model.existFetch(a.orderid),this.$el.find("#order_close").css("visibility","visible"),c.css("visibility","visible"),b={order_id:a.orderid,elem:c,is_new:!1},console.log(b),this.model.once("sync",this.showSyncModel,this),Backbone.Mediator.unsubscribe("orderitem-add",this.orderSave,this),Backbone.Mediator.pub("order-show",b)},close:function(){this.$el.find("#order_close").css("visibility","hidden"),this.$el.find("#order_items").css("visibility","hidden"),this.model.set({status:"closed"}),this.model.saveClosed(),Backbone.Mediator.unsubscribe("orderitem-add",this.orderSave,this),Backbone.Mediator.pub("order-close")},orderSave:function(){this.model.saveNew(),this.model.once("sync",this.successSaveNew,this)},successSaveNew:function(){var a=this.model.get("id");this.$el.find("#order_close").css("visibility","visible"),Backbone.Mediator.pub("order-create",a)}})}(),client.Models=client.Models||{},function(){"use strict";client.Models.OrderitemModel=Backbone.Model.extend({defaults:{name:"N/A",amount:1,price:0,status:"Not ready",order_id:0},url:"order_items.json",saveModel:function(){this.url="order_items/"+this.id+".json",this.save()}})}(),client.Collections=client.Collections||{},function(){"use strict";client.Collections.OrderitemsCollection=Backbone.Collection.extend({model:client.Models.OrderitemModel,url:"order_items.json",order_id:0,sum:0,initialize:function(){this.fetch({reset:!0}),Backbone.Mediator.subscribeOnce("order-create",this.changeOrderId,this)},changeOrderId:function(a){this.order_id=a,this.each(this.setOrderId,this)},setOrderId:function(a){a.set("order_id",this.order_id),a.url="order_items/"+a.id+".json",a.save({silent:!0})}})}(),client.Views=client.Views||{},function(){var a=$("#loader_block");client.Views.OrderitemView=Backbone.View.extend({id:"order_item",className:"order_item",template:JST["app/scripts/templates/OrderItem.ejs"],initialize:function(){this.model.on("destroy",this.removeView,this),Backbone.Mediator.sub("matching-items",this.incrMatchingAmount,this)},events:{"click #add_amount":"incrAmount","click #remove_amount":"decrAmount"},render:function(){var a=this.model.get("price"),b=this.model.get("amount"),c=a*b;return this.$el.html(this.template(this.model.toJSON())),this.publisher("add",c),this},publisher:function(a,b){Backbone.Mediator.pub("amount",{operation:a,difference:b})},incrAmount:function(a){a.stopPropagation(),a.preventDefault();var b=this.model.get("amount"),c=this.model.get("price"),d=this.$el.find("#remove_amount");b++,this.saveAmount(b),this.publisher("add",c),d.removeClass("close_item")},incrMatchingAmount:function(a){var b=a.get("amount"),c=a.get("price"),d=this.$el.find("#remove_amount");b++,this.saveAmount(b,a),this.publisher("add",c),d.removeClass("close_item"),this.$el.find("#order_item_amount").html(this.model.get("amount"))},decrAmount:function(b){b.stopPropagation(),b.preventDefault();var c=this.model.get("amount"),d=this.model.get("price"),e=this.$el.find("#remove_amount");c--,this.saveAmount(c),c>0?this.publisher("sub",d):0===c?(this.publisher("sub",d),e.addClass("close_item")):0>c&&(a.show(),console.log("This model:"),console.dir(this.model),this.model.url="order_items/"+this.model.id+".json",this.model.destroy())},saveAmount:function(b,c){a.show(),c?(c.set("amount",b),c.saveModel(b)):(this.model.set("amount",b),this.model.saveModel(b),this.$el.find("#order_item_amount").html(this.model.get("amount"))),a.hide()},removeView:function(){this.remove(),console.log("Was destroy"),a.hide()}})}(),client.Views=client.Views||{},function(){var a=$("#loader_block");client.Views.OrderitemcollectionView=Backbone.View.extend({template:JST["app/scripts/templates/OrderItemCollection.ejs"],initialize:function(){a.show(),this.collection=new client.Collections.OrderitemsCollection,this.collection.on("add",this.addItemToDB,this),this.collection.on("reset",this.renderCollectionFromDB,this),this.renderSum(),a.hide(),Backbone.Mediator.sub("amount",this.changeSum,this),Backbone.Mediator.sub("orderitem-add",this.addDataToModel,this),this.$el.addClass("for_order_items")},renderSum:function(){this.$el.html(this.template({sum:this.collection.sum}))},addDataToModel:function(a){var b=this.collection.findWhere({name:a.name});b?Backbone.Mediator.pub("matching-items",b):this.collection.add(new client.Models.OrderitemModel({name:a.name,price:a.price,order_id:this.collection.order_id}))},changeSum:function(a){var b=this.collection.sum,c={add:function(){b+=Number(a.difference)},sub:function(){b-=Number(a.difference)}};c[a.operation](),this.collection.sum=b,b=b.toFixed(2),this.$el.find("#sum").html(String(b))},addItemToDB:function(b){var c=new client.Views.OrderitemView({model:b});console.log("Begin adding item TO DB..."),console.log(this.collection),a.show(),b.save({silent:!0},{success:function(){a.hide(),console.log("Finish adding item TO DB!")}}),this.$el.prepend(c.render().el)},addItemsFromDB:function(a){if(a.get("order_id")===this.collection.order_id){var b=new client.Views.OrderitemView({model:a});this.$el.prepend(b.render().el)}},renderCollectionFromDB:function(){var a=this.$el.find("#block_sum");a.find("#sum").html(""),this.$el.html(""),this.$el.append(a),console.log("Begin adding items FROM DB..."),this.collection.each(this.addItemsFromDB,this),console.log(this.collection),console.log("Finish adding items FROM DB!")}})}(),client.Routers=client.Routers||{},function(){"use strict";client.Routers.TablesRouter=Backbone.Router.extend({initialize:function(){Backbone.Mediator.sub("table-active",this.changeUrl,this)},changeUrl:function(a){this.navigate("tables/"+a.tableid)},routes:{"(/)tables/:number":"myTrigger"},myTrigger:function(a){var b=$("#table-container").children()[a];$(b).trigger("click")}})}();