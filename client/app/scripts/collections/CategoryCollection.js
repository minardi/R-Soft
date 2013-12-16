/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.Collection = Backbone.Collection.extend({

        model: client.Models.Model,
        initialize: function() {
            //this.testAdding();
            //this.reset(this.models);
            this.fetch({reset: true});
        },
        url: '/categories',
        testAdding: function() {
            var Model = client.Models.Model;
            this.add(new Model({'category_name': 'Dricks'}));
            this.add(new Model({'category_name': 'Dessetrs'}));
            this.add(new Model({'category_name': 'Entrees'}));
            this.add(new Model({'category_name': 'Sides'}));
            this.add(new Model({'category_name': 'Bar'}));
        }

    });

})();
