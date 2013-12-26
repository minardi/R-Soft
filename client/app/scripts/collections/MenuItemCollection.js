/*global client, Backbone*/

client.Collections = client.Collections || {};

(function ( collections, models ) {
    'use strict';

    collections.MenuItemCollection = Backbone.Collection.extend({
        initialize: function() {
            this.fetch();
            console.log("menu_item fetch");
			},
			
		model: models.MenuItemModel,
		url: 'menu_items.json'
    });
	
})( client.Collections, client.Models );
