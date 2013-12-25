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
