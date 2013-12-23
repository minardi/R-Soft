/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.MenuItemView = Backbone.View.extend({

        template: JST['app/scripts/templates/MenuItem.ejs'],
        events: {
            'click .add_to_order': 'sendMenuItemToOrder',
			'click .menu_item_name': 'addDescView'
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },

        sendMenuItemToOrder : function() {
			console.log( this.model.get( 'name' ) + ' sent to Order' );
            Backbone.Mediator.pub( 'addOrderItem', { 'name': this.model.get( 'name' ), 'price': this.model.get( 'price' ) } );
        },
		
		addDescView: function(){ //sent mediator dlya descr
//			console.log( 'name: ' + this.model.get( 'name' ) );
//			console.log( this.el );
			Backbone.Mediator.pub('addMenuItemDesc', { 'id': this.model.get( 'description' ), 'el': this.el } );
		}

    });

})();
