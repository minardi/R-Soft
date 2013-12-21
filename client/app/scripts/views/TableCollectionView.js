/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.TableCollectionView = Backbone.View.extend({
        
        initialize: function() {
                        this.collection = new client.Collections.TableCollection();

                        this.collection.fetch();
                        this.collection.once("sync", this.render, this);                       
                    },

        render: function() {                  
                    this.collection.each(this.rendermodel, this);
                   
                    Backbone.Mediator.pub("tables-rendered");
                },

        rendermodel: function(tablemodel) {
                        var view = new client.Views.TableModelView({model: tablemodel});
                        this.$el.append(view.render().el);
                    }

    });

})();
