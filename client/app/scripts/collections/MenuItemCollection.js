/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.MenuItemCollection = Backbone.Collection.extend({
        initialize: function() {

 //           this.fetch();
            this.add( new client.Models.MenuItemModel( { "category": "Drinks", "name": "Capuccino", "desc": "yummy" , "price": "5"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Desserts", "name": "Ice Cream", "desc": "Pork, mutton, veal",  "price": "4"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Desserts", "name": "Cream Pie", "desc": "Pork, mutton, veal",  "price": "4"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Entrees", "name": "Soup", "desc": "tru lu la", "price": "10", "id": "2"} ));
            this.add( new client.Models.MenuItemModel( { "category": "Drinks", "name": "Esspreso", "desc": "yummy", "price": "5"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Sides", "name": "Cheese", "desc": "some ingredients", "price": "10"} ) );
            this.add( new client.Models.MenuItemModel( { "category": "Bar", "name": "Mochitto", "desc": "some ingredients", "price": "3"}));
            this.add( new client.Models.MenuItemModel( { "category": "Bar", "name": "Green Mexican","desc": "some ingredients", "price": "5"}));
            this.add( new client.Models.MenuItemModel( { "category": "Bar", "name": "B-52", "desc": "some ingredients", "price": "3"}));


        },

        model: client.Models.MenuItemModel//,
 //       url: 'menuitems.json'

    });

})();
