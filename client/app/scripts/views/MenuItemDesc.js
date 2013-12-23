/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.MenuItemDescView = Backbone.View.extend({

        template: JST['app/scripts/templates/MenuItemDesc.ejs'],
        events: {
            'click': 'del'
        },

        del: function(){
            this.$el.remove();
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        }

    });

})();
