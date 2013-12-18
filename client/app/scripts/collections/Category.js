/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.CategoryCollection = Backbone.Collection.extend({

        model: client.Models.CategoryModel,

        initialize: function() {
            //this.fetch();
            var models = client.Models;
            this.add(new models.CategoryModel({'category_name': 'Dricks'}));
            this.add(new models.CategoryModel({'category_name': 'Dessetrs'}));
            this.add(new models.CategoryModel({'category_name': 'Entrees'}));
            this.add(new models.CategoryModel({'category_name': 'Sides'}));
            this.add(new models.CategoryModel({'category_name': 'Bar'}));
        }

    });

})();
