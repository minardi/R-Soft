/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.MenuItemDescCollection = Backbone.Collection.extend({

        model: client.Models.MenuItemDescModel

    });

})();
