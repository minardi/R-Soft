/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function ( views ) {
    'use strict';

    views.MenuItemDescView = Backbone.View.extend({

        template: JST['app/scripts/templates/MenuItemDesc.ejs'],
        events: {
            'click': 'deleteEl'
        },

        deleteEl: function(){
            this.$el.remove();
        },

        render: function() {
                this.$el.html( this.template( this.model.toJSON() ) );
                return this;
        }

    });

})( client.Views );
