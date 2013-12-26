this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/CategoryView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'category-name\'>\r\n\t' +
((__t = ( category_name )) == null ? '' : __t) +
'\r\n</div>\r\n<div class=\'category-content\'></div>';

}
return __p
};

this["JST"]["app/scripts/templates/MenuItem.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = "menu_item_tpl">\r\n\t<div class = "scale_cont">\r\n\t\t<div class = "menu_item_name">' +
((__t = ( name )) == null ? '' : __t) +
'</div>\r\n\t\t<div class = "menu_item_price">' +
((__t = ( price )) == null ? '' : __t) +
' $</div>\r\n\t\t</div>\r\n\t<div class = "add_to_order"><img src="images/blue_arrow_right.png" alt="add_to_order"></div>\r\n</div>\r\n\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/templates/MenuItemDesc.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = \'desc\' >\r\n\t<div class = "wrap">\r\n\t\t<div class = "desc_name">' +
((__t = ( name )) == null ? '' : __t) +
'</div>\r\n\t\t<div class = "desc_description">' +
((__t = ( description )) == null ? '' : __t) +
'</div>\r\n\t</div>\r\n\t<div class = "desc_pic"><img src="images/' +
((__t = ( id )) == null ? '' : __t) +
'.jpg"></div>\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/templates/Order.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\r\n    <p id="order_head"> Order</p>\r\n\r\n    <div id="order_items" class="order_items">\r\n    </div>\r\n    \r\n    <input type = "button" id = "order_close" value = "Close order">  </input>\r\n';

}
return __p
};

this["JST"]["app/scripts/templates/OrderItem.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="order_item_name">' +
((__t = (name)) == null ? '' : __t) +
'</div>\r\n<div id="add_amount" class="add_amount"><br/></div>\r\n<div id="order_item_amount" class="order_item_amount">' +
((__t = (amount)) == null ? '' : __t) +
'</div>\r\n<div id="remove_amount" class="remove_amount"><br/></div>\r\n<div class="order_item_price">' +
((__t = (price)) == null ? '' : __t) +
'</div>\r\n<span id="order_item_status" class="order_item_status">' +
((__t = (status)) == null ? '' : __t) +
'</span>';

}
return __p
};

this["JST"]["app/scripts/templates/OrderItemCollection.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="ready_items">\r\n</div>\r\n<div id="block_sum" class="sum">\r\n  \tOrder amount: <span id="sum">' +
((__t = (sum)) == null ? '' : __t) +
'</span>\r\n</div>\r\n<div id="loader_block" class="preloader_block">\r\n  \t<img src="images/coffee.gif" class="preloader">\r\n  \t<div class="helper"></div>\r\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/TableCollectionView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="tablemap-container"></div>\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/templates/TableMapModelView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="bgdark" class="darkbg"></div>\r\n<div id="tablemap" class="table_map">\r\n    <input type="button" id="hidetablemap" value="Hide Map">\r\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/TableModelView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( id )) == null ? '' : __t) +
'\r\n\r\n';

}
return __p
};