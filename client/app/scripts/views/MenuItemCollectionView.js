/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function ( views, collections, mediator ) {
    'use strict';

    views.MenuItemCollectionView = Backbone.View.extend({
        initialize: function() {
            this.collection = new collections.MenuItemCollection();
            mediator.subscribeOnce ( 'categories-ready', this.render, this );
            this.elements = {};
        },

        addItem: function( item ) {
            var view = new views.MenuItemView( { model: item } ),
                key = item.get( 'category' ),
                element = this.elements[ key ];
				
			if(element) {
				element.append( view.render().el );
			} else {
				console.warn( "The category: " + item.get( 'category') + "didn't create" );			
			}
        },

        render: function( elements ) {
            this.elements = elements;
            this.collection.each( this.addItem, this );
        }
    });

})( client.Views, client.Collections, Backbone.Mediator );
