/*global client, Backbone*/

client.Models = client.Models || {};

(function () {
    'use strict';

    client.Models.CategoryModel = Backbone.Model.extend({
    	defaults: {
        	category_name: 'noname'
    	},
    view: undefined
    });

})();
