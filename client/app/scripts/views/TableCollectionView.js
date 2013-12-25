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
        
        template: JST['app/scripts/templates/TableCollectionView.ejs'],
        
        events: {
                    "click #showtablemap": "tableMapShow"
                },

        tableMapShow: function() {
                        this.$el.append(this.template);
                        var table_map = new client.Views.TableMapModelView({
                            el: $("#tablemap-container")
                        });
                    },
        
        render: function() {
                    this.collection.each(this.renderModel, this);
					
					Backbone.Mediator.pub("tables-rendered");
                },

        renderModel: function(tablemodel) {
                        var view = new client.Views.TableModelView({model: tablemodel});
                        this.$el.append(view.render().el);
                    },
                             

    });

})();
