/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.MenuItemDescView = Backbone.View.extend({

        template: JST['app/scripts/templates/menu_item_desc.ejs']

    });

})();
