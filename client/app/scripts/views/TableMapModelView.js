/*global client, Backbone, JST*/

client.Views = client.Views || {};

(function () {
    'use strict';

    client.Views.TableMapModelView = Backbone.View.extend({
    
        initialize: function() {
                        this.collection = new client.Collections.TableCollection();
                        this.collection.fetch();
                        this.collection.once("sync", this.render, this);
                    },

        template: JST['app/scripts/templates/TableMapModelView.ejs'],
        
        events: {
                    "click #hidetablemap": "tableMapHide"
                },
                
        tableMapHide: function() {
                        this.el.remove();
                    },
                    
        render:  function() {
                        this.$el.append(this.template);
                        this.collection.each(this.rendermodel, this);
                    },
        
        rendermodel: function(tablemodel) {
                            var view = new client.Views.TableModelView({model: tablemodel});
                            this.$el.append(view.maprender().el);
                        }  

    });

})();
