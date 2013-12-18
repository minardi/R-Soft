class CreateTables < ActiveRecord::Migration
  def change
    create_table :tables do |t|      
      t.string :orderid
      t.string :state
      t.string :activity
      t.string :capacity
      t.string :waiter
      
      t.timestamps
    end
  end
end
