
json.array!(@order_items) do |order_item|
  json.extract! @order_item, :id, :name, :amount, :price, :status, :order_id, :created_at, :updated_at
end