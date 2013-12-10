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
            
        Backbone.Mediator.sub('order-show', function(data){
                                            var go_items = new client.Views.OrderitemcollectionView({el: data.elem});
                                            //console.log(data.elem);
                                            //go_items.elem = data.elem;
                                            if (!isNaN(data.order_id)) {
                                                go_items.collection.order_id = data.order_id;
                                            } 
                                        }
        , this);
    }
};

$(document).ready(function () {
    'use strict';
    client.init();
});
