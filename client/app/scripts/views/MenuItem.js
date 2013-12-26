/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function ( views, mediator ) {
    'use strict';

    views.MenuItemView = Backbone.View.extend({

        template: JST[ 'app/scripts/templates/MenuItem.ejs' ],
        events: {
            'click .add_to_order': 'sendMenuItemToOrder',
			'click .menu_item_name': 'addDescView'
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },

        sendMenuItemToOrder : function() {
            mediator.pub( 'orderitem-add', { 'name': this.model.get( 'name' ), 'price': this.model.get( 'price' ) } );
        },
		
		addDescView: function(){
			mediator.pub('addMenuItemDesc', { 'id': this.model.get( 'description' ), 'el': this.el } );
		}
    });

})( client.Views, Backbone.Mediator );
