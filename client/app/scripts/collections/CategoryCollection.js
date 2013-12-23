/*global client, Backbone*/

client.Collections = client.Collections || {};

(function (collections, models) {
    'use strict';

    collections.CategoryCollection = Backbone.Collection.extend({

        model: models.CategoryModel,
        url: '/categories',

        initialize: function() {
		    this.add(new models.CategoryModel({'category_name': 'Drinks'}));
            this.add(new models.CategoryModel({'category_name': 'Desserts'}));
            this.add(new models.CategoryModel({'category_name': 'Entrees'}));
            this.add(new models.CategoryModel({'category_name': 'Sides'}));
            this.add(new models.CategoryModel({'category_name': 'Bar'}));
//            this.fetch({reset: true});
        }

    });

})(client.Collections, client.Models);
