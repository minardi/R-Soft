
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

    MenuItem.create([{category:'Drincks',name:'Capuccino',description: "1",price:40}])
    MenuItem.create([{category:'Drincks',name:'Esspreso',description: "2" ,price:50}])   
    MenuItem.create([{category:'Desserts',name:'Ice Cream',description:'3',price:20}])
    MenuItem.create([{category:'Desserts',name:'Apple Pie',description:'4',price:30}])
    MenuItem.create([{category:'Sides',name:'Cheese',description:'5',price:15}])
    MenuItem.create([{category:'Bar',name:'Green Mexican',description:'6',price:35}])

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
    
    


    

