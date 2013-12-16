/*global client, $*/


window.client = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('It"s work!');

        var menu_item = new client.Views.MenuItemCollectionView(),
		menu_item_desc = new client.Views.MenuItemDescCollection();
    }
};

$(document).ready(function () {
    'use strict';
    client.init();
});
