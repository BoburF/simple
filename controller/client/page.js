const Product = require('../../model/Product')
module.exports = {
    home: async (req, res) => {
        const products = await Product.find().sort({date: -1}).limit(3)
        res.render('index', {
            title: 'Home page',
            products,
            bug_products: res.locals.bug_products
        })
    },
    contact: (req, res) => {
        res.render('contact', {
            title: 'Contact',
            bug_products: res.locals.bug_products
        })
    },
    about: (req, res) => {
        res.render('about', {
            title: 'About',
            bug_products: res.locals.bug_products
        })
    },
    news: (req, res) => {
        res.render('news', {
            title: 'News',
            bug_products: res.locals.bug_products
        })
    },
}