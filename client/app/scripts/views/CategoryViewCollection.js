/*global client, Backbone, JST*/

client.Views = client.Views || {};


(function (views, collections, mediator) {
    'use strict';

    views.CategoryCollectionView = Backbone.View.extend({

        cattegories_obj: {},
        el: $('#menu-container'),

        initialize: function() {
            this.$el = $('#menu-container');

            this.collection = new collections.CategoryCollection();

            this.collection.on('reset', this.afterLoad, this);
        },
        afterLoad: function () {
            this.render();
            mediator.pub('categories-ready', this.cattegories_obj);

        },
        render: function() {
            this.$el.html("Menu");
            this.collection.each(this.addOneCategory, this);
        },
        addOneCategory: function(model) {

            var view = new client.Views.CategoryView({
                'model': model
            });
            this.cattegories_obj[model.get('category_name')] = view.$el;
            this.$el.append(view.render().$el);
        }

    });

})(client.Views, client.Collections, Backbone.Mediator);
