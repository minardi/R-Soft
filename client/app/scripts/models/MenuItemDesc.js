/*global client, Backbone*/

client.Models = client.Models || {};

(function ( models ) {
    'use strict';

    models.MenuItemDescModel = Backbone.Model.extend({
        defaults: {
            name: 'N/A',
			description : 'N/A',
			uri_image: 'N/A'
        }
    });

})( client.Models );
