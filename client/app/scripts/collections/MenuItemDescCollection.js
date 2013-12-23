/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.MenuItemDescCollection = Backbone.Collection.extend({
       initialize: function() {		
		//            this.fetch();

            this.add( new client.Models.MenuItemDescModel( { "id": "1"
				,"name": "Capuccino"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs." 
				, "uri_image": "images/1.jpg"} ) );
            this.add( new client.Models.MenuItemDescModel( { "id": "2"
				,"name": "Ice Cream"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				,  "uri_image": "images/2.jpg"} ) );
            this.add( new client.Models.MenuItemDescModel( { "id": "3"
				, "name": "Cream Pie"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				,  "uri_image": "images/3.jpg"} ) );
            this.add( new client.Models.MenuItemDescModel( { "id": "4"
				,  "name": "Soup"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				, "uri_image": "images/4.jpg"} ) );
            this.add( new client.Models.MenuItemDescModel( { "id": "5"
				, "name": "Esspreso"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				, "uri_image": "images/5.jpg"} ) );
            this.add( new client.Models.MenuItemDescModel( { "id": "6"
				,  "name": "Cheese"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				, "uri_image": "images/6.jpg"} ) );          
			this.add( new client.Models.MenuItemDescModel( { "id": "7"
				,  "name": "Mochitto"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				, "uri_image": "images/6.jpg"}));
            this.add( new client.Models.MenuItemDescModel( { "id": "8"
				,  "name": "Green Mexican"
				,"description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				, "uri_image": "images/7.jpg"}));
            this.add( new client.Models.MenuItemDescModel( { "id": "9"
				,  "name": "B-52"
				, "description": "A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs."
				, "uri_image": "images/8.jpg3"})); 
        }, 
		

        model: client.Models.MenuItemDescModel//,
 //       url: 'menu_item_descs.json'
        });

})();

