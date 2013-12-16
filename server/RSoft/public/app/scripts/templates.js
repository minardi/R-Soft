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

this["JST"]["app/scripts/templates/CategoryViewCollection.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/templates/MenuItem.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = "menu_item_tpl">\n\t<div class = "menu_item_name">' +
((__t = ( name )) == null ? '' : __t) +
'</div>\n\t<div class = "menu_item_description">' +
((__t = ( description )) == null ? '' : __t) +
'</div>\n\t<div class = "menu_item_price">' +
((__t = ( price )) == null ? '' : __t) +
' $</div>\n\t<div class = "add_to_order"><img src="images/blue_arrow_right.png" alt="add_to_order"></div>\n</div>\n\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/Order.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = "order_box">\r\n\t<p id="order_head"> Order</p>\r\n\t\r\n\t<div id="order_items" class="order_items">\r\n\t\t<div class="sum">Order amount: <span id="sum"></span></div>\r\n\t</div>\t\r\n\t\r\n\t<input type = "button" id = "order_close" value = "Close order">  </input>\r\n</div>';

}
return __p
};

this["JST"]["app/scripts/templates/OrderItem.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="order_item"  class="order_item">\r\n\t<div class="order_item_name"><?=name?></div>\r\n\t<div id="add_amount" class="add_amount"><br/></div>\r\n\t<div id="order_item_amount" class="order_item_amount"><?=amount?></div>\r\n\t<div id="remove_amount" class="remove_amount"><br/></div>\r\n\t<div class="order_item_price"><?=price?></div>\r\n\t<span class="order_item_status"><?=status?></span>\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/templates/OrderItemCollection.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/templates/TableCollectionView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\r\n\r\n';

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

this["JST"]["app/scripts/templates/menu_item_desc.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\n\n';

}
return __p
};