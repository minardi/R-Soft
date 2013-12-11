/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.MenuItemView = Backbone.View.extend({

        template: JST['app/scripts/templates/MenuItem.ejs'],
        events: {
            'click': 'addMediatorPub'
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },

        addMediatorPub : function() {
            Backbone.Mediator.pub( 'addOrderItem', { 'name': this.name, 'price': this.price } );
        }

    });

})();
