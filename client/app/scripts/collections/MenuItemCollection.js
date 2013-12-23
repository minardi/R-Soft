/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.MenuItemCollection = Backbone.Collection.extend({
        initialize: function() {
//            this.fetch( /*{reset: true}*/ );

            this.add( new client.Models.MenuItemModel( { "category": "Drinks"
				, "name": "Capuccino"
				, "description": "1" 
				, "price": "5"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Desserts"
				, "name": "Ice Cream"
				, "description": "2"
				,  "price": "4"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Desserts"
				, "name": "Cream Pie"
				, "description": "3"
				,  "price": "4"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Entrees"
				, "name": "Soup"
				, "description": "4"
				, "price": "10"} ));
            this.add( new client.Models.MenuItemModel( { "category": "Drinks"
				, "name": "Esspreso"
				, "description": "5"
				, "price": "5"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Sides"
				, "name": "Cheese"
				, "description": "6"
				, "price": "10"} ) );          
			this.add( new client.Models.MenuItemModel( { "category": "Bar"
				, "name": "Mochitto"
				, "description": "7"
				, "price": "3"}));
            this.add( new client.Models.MenuItemModel( { "category": "Bar"
				, "name": "Green Mexican"
				,"description": "8"
				, "price": "5"}));
            this.add( new client.Models.MenuItemModel( { "category": "Bar"
				, "name": "B-52"
				, "description": "9"
				, "price": "3"})); 
        }, 

        model: client.Models.MenuItemModel,
 //       url: 'menu_items.json'
    });

})();
