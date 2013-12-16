/*global client, $*/


window.client = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';

        console.log('It"s work!');
		
//////////origin/master
        var menu_item = new client.Views.MenuItemCollectionView(),
//		menu_item_desc = new client.Views.MenuItemDescCollection(), //not ready yet
		categories = new client.Views.CollectionView();

        console.log('Hello from Backbone!');
    }
};

$(document).ready(function () {
    'use strict';
    client.init();
});
