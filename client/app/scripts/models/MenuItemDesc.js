/*global client, Backbone*/

client.Models = client.Models || {};

(function () {
    'use strict';

    client.Models.MenuItemDescModel = Backbone.Model.extend({
	       defaults: {
		    name: 'N/A',
            description : 'N/A',
			uri_image: 'N/A'
        }
    });

})();
