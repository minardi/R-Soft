/*global client, $*/


window.client = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('It"s work!');

        var menuitem = new client.Views.MenuItemCollectionView();
    }
};

$(document).ready(function () {
    'use strict';
    client.init();
});
