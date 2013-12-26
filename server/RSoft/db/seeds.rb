
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
	
	
	MenuItemDesc.create([{name:'Capuccino', description:'Frothed milk and a shot of espresso, topped with a touch of cinnamon', uri:1.jpg}])
	MenuItemDesc.create([{name:'Esspreso', description:'A type of coffee prepared from a blend of coffee beans and produced when pressed through a fine filter under high pressure.', uri:2.jpg}])
	MenuItemDesc.create([{name:'Ice Cream', description:'Our delicious traditional vanilla ice cream with a chocolate fudge sauce rippled throughout.', uri:3.jpg}])
	MenuItemDesc.create([{name:'Apple Pie', description:'Using fresh apples, a homemade pie crust recipe, and the perfect blend of spices; this is the apple pie that is true delight in every forkful.', uri:4.jpg}])
	MenuItemDesc.create([{name:'Cheese', description:'Some description, some description, ect..', uri:5.jpg}])
	MenuItemDesc.create([{name:'Green Mexican', description:'Some coctails description', uri:6.jpg}])

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
    
    


    

