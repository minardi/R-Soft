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
            var checking_model = this.collection.findWhere({name: item_data.name, status: "Not ready"});

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
