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
