json.array!(@tables) do |table|
  json.extract! table, :id, :orderid, :state, :activity, :capacity, :waiter, :xchord, :ychord
  json.url table_url(table, format: :json)
end
