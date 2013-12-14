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
