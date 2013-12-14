class CreateOrderItems < ActiveRecord::Migration
  def change
    create_table :order_items do |t|
      t.string :name
      t.integer :amount
      t.integer :price
      t.string :status
      t.integer :order_id

      t.timestamps
    end
  end
end
