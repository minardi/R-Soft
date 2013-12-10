/*global client, $*/


window.client = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log("It's work!");

        var category = new this.Views.CategorycollectionView(),
            tables = new this.Views.TableCollectionView();
    }
};

$(document).ready(function () {
    'use strict';
    client.init();
});
