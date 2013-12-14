/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.View = Backbone.View.extend({
        model:undefined,
        tagName: 'div',
        className: "category-container",        
        template: JST['app/scripts/templates/CategoryView.ejs'],
        
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

})();
