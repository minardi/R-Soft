/*global client, Backbone, JST*/

client.Views = client.Views || {};


(function (views) {
    'use strict';

    views.CategoryView = Backbone.View.extend({
        
        tagName: 'div',
        className: "category-container", 

        template: JST['app/scripts/templates/CategoryView.ejs'],

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            this.content = this.$el.find('.category-content');
            this.$el.find('.category-name').on('click', {content: this.content}, this.slideCategories);

            return this;
        },

        slideCategories: function(event) {
            event.data.content.slideToggle();
        }

    });

})(client.Views);
