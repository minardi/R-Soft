/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function (  views, collections, mediator  ) {
    'use strict';


    views.MenuItemDescCollView = Backbone.View.extend({
	    initialize: function() {
            this.collection = new collections.MenuItemDescCollection();
	        mediator.sub( 'addMenuItemDesc', this.render, this );
		},
			
		element: {},
        id: 0,


		render: function( menu_item ) {
            var the_model = this.collection.findWhere( { 'id': menu_item.id } );
            this.element = $(menu_item.el);
            this.addItem(  the_model );
		},


		addItem: function( model ) {
			var view = new client.Views.MenuItemDescView( { "model": model } );

			this.element.prepend( view.render().$el );
        }
    });

})( client.Views, client.Collections, Backbone.Mediator );
