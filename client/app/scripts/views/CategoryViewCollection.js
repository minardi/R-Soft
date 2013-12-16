/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.CollectionView = Backbone.View.extend({

        //template: JST['app/scripts/templates/CategoryViewCollection.ejs']
        cattegories_obj: {},
        el: $('#menu-container'),
        initialize: function() {
            this.$el = $('#menu-container');

            this.collection = new client.Collections.Collection();
            this.collection.on('reset', this.afterLoad, this);
        },
        afterLoad: function () {
            this.render();
            Backbone.Mediator.pub('categories-ready', this.cattegories_obj);
        },
        render: function() {
            this.$el.html("Menu");
            this.collection.each(this.addOneCategory, this);
        },
        addOneCategory: function(model) {
            var view = new client.Views.View({
                'model': model
            });
            this.cattegories_obj[model.get('category_name')] = view.$el;
            this.$el.append(view.render().$el);
        }

    });

})();
