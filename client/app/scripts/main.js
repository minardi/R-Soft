/*global client, $*/


window.client = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('It"s work!');

        $.ajaxSetup({
            headers:{
                'X-CSRF-Token':$('meta[name="csrf-token"]').attr('content')
            }
        });


        var menuitem = new client.Views.MenuItemCollectionView();
    }
};

$(document).ready(function () {
    'use strict';
    client.init();
});
