/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.CategorycollectionView = Backbone.View.extend({
        cattegories_obj: {},
        //template: JST['app/scripts/templates/CategoryCollection.ejs'],
        el: $('#menu-container'),

        initialize: function() {
            this.$el = $('#menu-container');
            this.collection = new client.Collections.CategoryCollection();
            this.render();
            Backbone.Mediator.pub('categories-ready', this.cattegories_obj);
        },

        render: function() {
            this.$el.html("");
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

})();
