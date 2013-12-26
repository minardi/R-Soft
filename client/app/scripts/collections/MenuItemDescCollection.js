/*global client, Backbone*/

client.Collections = client.Collections || {};

(function ( collections, models ) {
    'use strict';

    collections.MenuItemDescCollection = Backbone.Collection.extend({
       initialize: function() {		
            this.add( new models.MenuItemDescModel( { "id": "1"
				,"name": "Capuccino"
				, "description": "Frothed milk and a shot of espresso, topped with a touch of cinnamon."
				, "uri_image": "images/1.jpg"} ) );
           this.add( new models.MenuItemDescModel( { "id": "2"
               , "name": "Esspreso"
               , "description": "A type of coffee prepared from a blend of coffee beans and produced when pressed through a fine filter under high pressure."
               , "uri_image": "images/2.jpg"} ) );

            this.add( new models.MenuItemDescModel( { "id": "3"
				,"name": "Ice Cream"
				, "description": "Our delicious traditional vanilla ice cream with a chocolate fudge sauce rippled throughout."
				,  "uri_image": "images/3.jpg"} ) );
            this.add( new models.MenuItemDescModel( { "id": "4"
				, "name": "Cream Pie"
				, "description": "Using fresh apples, a homemade pie crust recipe, and the perfect blend of spices; this is the apple pie that is true delight in every forkful."
				,  "uri_image": "images/4.jpg"} ) );
            this.add( new models.MenuItemDescModel( { "id": "5"
				,  "name": "Cheese"
				, "description": "Some description, some description, ect.."
				, "uri_image": "images/5.jpg"} ) );

            this.add( new models.MenuItemDescModel( { "id": "6"
				,  "name": "Green Mexican"
				, "description": "Some coctails description."
				, "uri_image": "images/6.jpg"} ) );
        }, 
		
        model: client.Models.MenuItemDescModel
        });

})( client.Collections, client.Models );

