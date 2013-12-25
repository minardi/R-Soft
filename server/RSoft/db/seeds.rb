
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

    Category.create([{category_name:'Drinks'}])
    Category.create([{category_name:'Desserts'}])
    Category.create([{category_name:'Entrees'}])
    Category.create([{category_name:'Sides'}])
    Category.create([{category_name:'Bar'}])
    
    Table.create([{orderid:'none',state:'vacant',activity:'false',capacity:4, waiter:'n/a', xchord:140, ychord:140}])
    Table.create([{orderid:'none',state:'vacant',activity:'false',capacity:2, waiter:'n/a', xchord:628, ychord:140}])
    Table.create([{orderid:'none',state:'vacant',activity:'false',capacity:6, waiter:'n/a', xchord:140, ychord:443}])
    Table.create([{orderid:'none',state:'vacant',activity:'false',capacity:3, waiter:'n/a', xchord:628, ychord:443}])
    Table.create([{orderid:'none',state:'vacant',activity:'false',capacity:5, waiter:'n/a', xchord:384, ychord:283}])

    MenuItem.create([{category:'Drincks',name:'wine',description:'white add other descriptions',price:40}])
    MenuItem.create([{category:'Drincks',name:'wine',description:'white add other descriptions',price:50}])   
    MenuItem.create([{category:'Desserts',name:'tiramisu',description:'Desserts descriptions',price:20}])
    MenuItem.create([{category:'Desserts',name:'pudding',description:'Desserts descriptions',price:30}])
    MenuItem.create([{category:'Sides',name:'some Side',description:'Sides descriptions',price:15}])
    MenuItem.create([{category:'Sides',name:'some Side2',description:'Sides descriptions',price:35}])

    waiter = User.new
    waiter.email = 'waiter@rsoft.ru'
    waiter.password = '1234'
    waiter.password_confirmation = '1234'
    waiter.save!

    admin = User.new
    admin.email = 'admin@rsoft.ru'
    admin.password = '1234'
    admin.password_confirmation = '1234'
    admin.save!
    
    


    

