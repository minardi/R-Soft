/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.MenuItemCollection = Backbone.Collection.extend({
        initialize: function() {
            this.fetch();
/*
            this.add( new client.Models.MenuItemModel( { "category": "Drinks"
				, "name": "Capuccino"
				, "description": "desc" 
				, "price": "5"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Desserts"
				, "name": "Ice Cream"
				, "description": "desc"
				,  "price": "4"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Desserts"
				, "name": "Cream Pie"
				, "description": "desc"
				,  "price": "4"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Entrees"
				, "name": "Soup"
				, "description": "desc"
				, "price": "10"} ));
            this.add( new client.Models.MenuItemModel( { "category": "Drinks"
				, "name": "Esspreso"
				, "description": "desc"
				, "price": "5"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Sides"
				, "name": "Cheese"
				, "description": "desc"
				, "price": "10"} ) );          
			this.add( new client.Models.MenuItemModel( { "category": "Bar"
				, "name": "Mochitto"
				, "description": "desc"
				, "price": "3"}));
            this.add( new client.Models.MenuItemModel( { "category": "Bar"
				, "name": "Green Mexican"
				,"description": "desc"
				, "price": "5"}));
            this.add( new client.Models.MenuItemModel( { "category": "Bar"
				, "name": "B-52"
				, "description": "desc"
				, "price": "3"})); */
        }, 

        model: client.Models.MenuItemModel,
        url: 'menu_items.json'
    });

})();
