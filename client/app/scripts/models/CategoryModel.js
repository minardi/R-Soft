/*global client, Backbone*/

client.Models = client.Models || {};

(function (models) {
    'use strict';

    models.CategoryModel = Backbone.Model.extend({
    
        defaults: {
            category_name: 'noname'
        },
        view: undefined
    });

})(client.Models);
