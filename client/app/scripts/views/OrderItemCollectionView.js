/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    var preloader_block = $('#loader_block');

    client.Views.OrderitemcollectionView = Backbone.View.extend({

        template: JST['app/scripts/templates/OrderItemCollection.ejs'],

        initialize: function() {
            //this.preloader_block = this.$el.find('#loader_block');
            preloader_block.show();

            this.collection = new client.Collections.OrderitemsCollection();

            this.collection.on('add', this.addItemToDB, this);
            this.collection.on("reset", this.renderCollectionFromDB, this); // No reset in v. >= 1.0!!!

            this.renderSum();
            preloader_block.hide();
            
            Backbone.Mediator.sub("amount", this.changeSum, this);
            Backbone.Mediator.sub("orderitem-add", this.addDataToModel, this);

            this.$el.addClass('for_order_items');
        },

        renderSum: function() {
            this.$el.html(this.template({sum: this.collection.sum}));
        },

        addDataToModel: function(item_data) {
            var checking_model = this.collection.findWhere({'name': item_data.name});

            if (checking_model) {
                Backbone.Mediator.pub('matching-items', checking_model);
            } else {
                this.collection.add(new client.Models.OrderitemModel({
                    "name": item_data.name,
                    "price": item_data.price,
                    "order_id": this.collection.order_id
                    }));
                    //Use this.changesum(data)
                    /*Backbone.Mediator.pub("amount", {
                                        "operation": "add",
                                        "difference": item_data.price
                                        }
                    );*/
            }
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
            this.$el.find("#sum").html(String(sum));
        },

        //Work with DB
        addItemToDB: function(item) {
            var view = new client.Views.OrderitemView({model: item,
                                                           //sub_el: this.preloader_block,
                                             });
            
            console.log('Begin adding item TO DB...');
            console.log(this.collection);
            preloader_block.show();
            
/*Use event instead of save-callbacks!*/
            item.save({silent: true},
                {success: function() {
                            preloader_block.hide();
                            console.log('Finish adding item TO DB!');
                            //elem.prepend(view.render().el);
                        }
                } 
            );
            this.$el.prepend(view.render().el);
        },
        
        addItemsFromDB: function(item) {
            if (item.get('order_id') === this.collection.order_id) {
                var view = new client.Views.OrderitemView({model: item
                                                  });
                this.$el.prepend(view.render().el);
            }
        },
        
        renderCollectionFromDB: function() {
            var save_block_sum = this.$el.find('#block_sum');
            
//Use template
            save_block_sum.find('#sum').html('');
            this.$el.html('');
            this.$el.append(save_block_sum);
            
            console.log('Begin adding items FROM DB...');
            this.collection.each(this.addItemsFromDB, this);
            console.log(this.collection);
            console.log('Finish adding items FROM DB!');
        }
    });

})();
