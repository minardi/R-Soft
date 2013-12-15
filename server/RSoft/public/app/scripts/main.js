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

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/MenuItem.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = "menu_item_tpl">\n    <div class = "menu_item_name">' +
((__t = ( name )) == null ? '' : __t) +
'</div>\n    <div class = "menu_item_description">' +
((__t = ( description )) == null ? '' : __t) +
'</div>\n    <div class = "menu_item_price">' +
((__t = ( price )) == null ? '' : __t) +
'$</div>\n\t<div class = "add_to_order"><img src="images/blue_arrow_right.png" alt="add_to_order"></div>\n</div>\n\n';

}
return __p
};
/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.MenuItemView = Backbone.View.extend({

        template: JST['app/scripts/templates/MenuItem.ejs'],
        events: {
            'click .add_to_order': 'addMediatorPub'
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },

        addMediatorPub : function() {
            Backbone.Mediator.pub( 'addOrderItem', { 'name': this.model.get('name'), 'price': this.model.get('price') } );
        }

    });

})();

/*global client, Backbone*/

client.Models = client.Models || {};

(function () {
    'use strict';

    client.Models.MenuItemModel = Backbone.Model.extend({
        defaults: {
            category : 'N/A',
            name : 'N/A',
            description : 'N/A',
            price : 'N/A'
        }
    });

})();

/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.MenuItemCollection = Backbone.Collection.extend({
        initialize: function() {
            this.fetch();
			},

        model: client.Models.MenuItemModel,
        url: 'menu_items.json'
    });

})();

/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.MenuItemCollectionView = Backbone.View.extend({
        initialize: function() {
            this.collection = new client.Collections.MenuItemCollection();

            Backbone.Mediator.subscribe ( 'categories-ready', this.render, this );
            this.elements = {};
        },


        addItem: function( item ) {
            var view = new client.Views.MenuItemView( { model: item } ),
                key = item.get( 'category' ),
                element = this.elements[ key ];

            element.append( view.render().el );

        },


        render: function( elements ) {
            this.elements = elements;
            this.collection.each( this.addItem, this );
        }
    });


})();
