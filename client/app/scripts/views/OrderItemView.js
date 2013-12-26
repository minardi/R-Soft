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
                "click #remove_amount": "decrAmount",
                "click #order_item_status": "changeInReady"
        },

        render: function() {
            var price = this.model.get('price'),
                amount = this.model.get('amount'),
                difference_price = price * amount,
                status = this.model.get('status');

            if (status === "Not ready") {
                this.$el.html(this.template(this.model.toJSON()));
            } else {
                this.el = $('#ready_items');
                this.el.addClass('ready_items');
                this.el.prepend(this.template(this.model.toJSON()) + "<br/>");
                this.el.find('add_amount').hide();
                this.el.find('remove_amount').hide();
            }
            

            this.publisher("add", difference_price);

            return this;
        },

        changeInReady: function() {
            this.model.set('status', "Ready");
            this.model.saveModel();
            this.model.once('sync', this.renderInReady, this);
        },

        renderInReady: function() {
            var old_view = this;

            this.el = $('#ready_items');
            this.el.addClass('ready_items');
            this.el.prepend(this.template(this.model.toJSON()) + "<br/>");
            this.el.find('add_amount').hide();
            this.el.find('remove_amount').hide();
            old_view.remove();
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
                this.model.saveModel();
                this.model.once('sync', function() {
                            this.$el.find('#order_item_amount').html(amount_value);
                }, this);
        }

    });
})(client.Views, Backbone.Mediator);
