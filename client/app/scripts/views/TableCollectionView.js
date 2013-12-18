/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.TableCollectionView = Backbone.View.extend({
        
        initialize: function() {
                        this.collection = new client.Collections.TableCollection();

                        this.collection.fetch();
                        this.collection.once("sync", this.render, this);
                        console.log("Fetching Collection Complete");
                    },

        render: function() {
                    console.log("Rendering Collection...");
                    this.collection.each(this.rendermodel, this);
                    console.log(this.collection);
                    console.log("Collection Rendered");
                },

        rendermodel: function(tablemodel) {
                        var view = new client.Views.TableModelView({model: tablemodel});
                        this.$el.append(view.render().el);
                    }

    });

})();
