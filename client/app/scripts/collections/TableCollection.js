/*global client, Backbone*/

client.Collections = client.Collections || {};

(function () {
    'use strict';

    client.Collections.TableCollection = Backbone.Collection.extend({

        model: client.Models.TableModel,
        url: "tables.json"

    });

})();
