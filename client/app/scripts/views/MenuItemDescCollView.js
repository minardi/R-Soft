/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.MenuItemDescCollView = Backbone.View.extend({
	    initialize: function() {
//	this.element = $('#test');
        this.collection = new client.Collections.MenuItemDescCollection();
	    Backbone.Mediator.sub ( 'addMenuItemDesc', this.render /*createDesc*/, this );
		},
			
		element: {},
        id: 0,

			
			render: function( menu_item ) {
				console.log( menu_item );
				this.element = $(menu_item.el);
                this.id = menu_item.id;
				this.collection.each( this.checkName, this );
			},

            checkName: function(model){
                if(model.get('id')== this.id){
                    this.addItem(model);
                } else {
                    console.log('Description doesn"t create');
                }
    },
			
			
			addItem: function( desc ) {
                console.log(this.element);
				var view = new client.Views.MenuItemDescView( { model: desc } );

//				this.element.append( view.render().$el );
				this.element.html( view.render().$el ); // WARN!!
        }

    });
})();
