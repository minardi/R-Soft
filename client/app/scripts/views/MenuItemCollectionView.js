/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.MenuItemCollectionView = Backbone.View.extend({
        initialize: function() {
            this.collection = new client.Collections.MenuItemCollection();

            Backbone.Mediator.subscribeOnce ( 'categories-ready', this.render, this );
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
