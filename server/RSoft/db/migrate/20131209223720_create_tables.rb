class CreateTables < ActiveRecord::Migration
  def change
    create_table :tables do |t|
      t.string :orderid
      t.string :state
      t.string :activity
      t.integer :capacity
      t.string :waiter
      t.integer :xchord
      t.integer :ychord

      t.timestamps
    end
  end
end