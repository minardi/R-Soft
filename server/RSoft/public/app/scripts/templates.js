this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/CategoryView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'category-name\'>\n\t' +
((__t = ( category_name )) == null ? '' : __t) +
'\n</div>\n<div class=\'category-content\'></div>';

}
return __p
};

this["JST"]["app/scripts/templates/MenuItem.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = "menu_item_tpl">\n\t<div class = "scale_cont">\n\t\t<div class = "menu_item_name">' +
((__t = ( name )) == null ? '' : __t) +
'</div>\n\t\t<div class = "menu_item_price">' +
((__t = ( price )) == null ? '' : __t) +
' $</div>\n\t\t</div>\n\t<div class = "add_to_order"><img src="images/blue_arrow_right.png" alt="add_to_order"></div>\n</div>\n\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/MenuItemDesc.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = \'desc\' >\n\t<div class = "wrap">\n\t\t<div class = "desc_name">' +
((__t = ( name )) == null ? '' : __t) +
'</div>\n\t\t<div class = "desc_description">' +
((__t = ( description )) == null ? '' : __t) +
'</div>\n\t</div>\n\t<div class = "desc_pic"><img src="images/' +
((__t = ( id )) == null ? '' : __t) +
'.jpg"></div>\n</div>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/Order.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n    <p id="order_head"> Order</p>\n\n    <div id="order_items" class="order_items">\n    </div>\n    \n    <input type = "button" id = "order_close" value = "Close order">  </input>\n';

}
return __p
};

this["JST"]["app/scripts/templates/OrderItem.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="order_item_name">' +
((__t = (name)) == null ? '' : __t) +
'</div>\n<div id="add_amount" class="add_amount"><br/></div>\n<div id="order_item_amount" class="order_item_amount">' +
((__t = (amount)) == null ? '' : __t) +
'</div>\n<div id="remove_amount" class="remove_amount"><br/></div>\n<div class="order_item_price">' +
((__t = (price)) == null ? '' : __t) +
'</div>\n<span class="order_item_status">' +
((__t = (status)) == null ? '' : __t) +
'</span>';

}
return __p
};

this["JST"]["app/scripts/templates/OrderItemCollection.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="block_sum" class="sum">\n  \tOrder amount: <span id="sum">' +
((__t = (sum)) == null ? '' : __t) +
'</span>\n</div>\n<div id="loader_block" class="preloader_block">\n  \t<img src="images/coffee.gif" class="preloader">\n  \t<div class="helper"></div>\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/TableCollectionView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="tablemap-container"></div>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/TableMapModelView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="bgdark" class="darkbg"></div>\n<div id="tablemap" class="table_map">\n    <input type="button" id="hidetablemap" value="Hide Map">\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/TableModelView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( id )) == null ? '' : __t) +
'\n\n';

}
return __p
};