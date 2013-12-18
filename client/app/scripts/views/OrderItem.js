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
