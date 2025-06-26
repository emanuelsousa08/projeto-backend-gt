const User = require('../models/User');
const Category = require('../models/Category')
const connection = require('../config/connection');
const Product = require('../models/Product');

async function execute() {
    // let user = await User.create({
    //     firstname: "Agatha",
    //     surname: "Harkness",
    //     email: "aggie@email.com",
    //     password: 123456,
    // })

    //http://localhost:3000/v1/user/3
    // let user1 = await User.update(
    //     {surname: "Bacelar"},
    //     {where: {id: 3}}
    // );
    // let user1 = await User.destroy({where: {id: 3}});
    // console.log(user1);
    await connection.authenticate(); 
    console.log('Conexão com o BD estabelecida!');
    // let category = await Category.create({
    //     name: "Teste",
    //     slug: "gsgss",
    //     use_in_menu: true
    // });
    // let category = await Category.update({
    //     name: "Headphones",
    //     slug: "headphones",
    //     use_in_menu: true
    // },{where: {id: 3}});
    let product = await Product.create({
        enabled: true,
        name: "Produto 01",
        slug: "produto 01",
        use_in_menu: true,
        stock: 10,
        description: "Descrição",
        price: 119.99,
        price_with_discount: 99.99,

    })
    console.log(product);
    
}

execute();