/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.CategoryView = Backbone.View.extend({
        model:undefined,
        tagName: 'div',
        className: "category-container",
        //template: JST['app/scripts/templates/Category.ejs'],
        template: _.template("<div class='category-name'><%= category_name %></div><div class='category-content'></div>"),
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

})();
