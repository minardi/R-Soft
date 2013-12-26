/*global client, Backbone*/

client.Models = client.Models || {};

(function ( models ) {
    'use strict';

    models.MenuItemModel = Backbone.Model.extend({
        defaults: {
            category : 'N/A',
            name : 'N/A',
            description : 'N/A',
            price : 'N/A'
        }
    });

})( client.Models );
