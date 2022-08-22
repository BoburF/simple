const Product = require('../../model/Product')
module.exports = {
    home: async (req, res) => {
        const products = await Product.find().sort({date: -1})
        const sum = []
        for(let i = 0; i < Math.ceil(products.length / 6); i++){
            if(i === +req.params.page){
                sum.push({count: i + 1 ,active: 'active', page: i})
            }else{
                sum.push({count: i + 1 ,active: 'none', page: i})
            }
        }
        const product = products.slice((+req.params.page * 6), (+req.params.page * 6) + 6)
        
        res.render('shop', {
            title: 'Shop',
            products: product,
            bug_products: res.locals.bug_products,
            sum
        })
    },
    productOne: async (req, res) => {
        const products = await Product.find().sort({date : -1}).limit(3)
        const product = await Product.findById(req.params.id)
        res.render('single_page', {
            title: 'Product',
            product,
            products,
            bug_products: res.locals.bug_products
        })
    }
}