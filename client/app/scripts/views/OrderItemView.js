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
