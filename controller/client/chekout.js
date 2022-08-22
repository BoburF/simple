const telegram = require('../../utils/telegramBot')
const { encode } = require('url-encode-decode')

module.exports = {
    home: (req, res) => {
        const products = []
        for (let i = 0; i < res.locals.bug_products.length; i++) {
            const pro = {
                name: res.locals.bug_products[i].name,
                price: res.locals.bug_products[i].price * res.locals.bug_products[i].__v
            }
            products.push(pro)
        }

        res.render('chekout', {
            title: 'Checkout',
            products
        })
    },

    message: async (req, res) => {
        let txt = `User name:${req.body.name} \nUser adress:${req.body.address} \nUser phone: ${req.body.phone} \n\n`
        for(let i = 0; i < res.locals.bug_products.length; i++){
            let num = i + 1
            let text = `List products: \n\n Name:${res.locals.bug_products[i].name} \n Price:${res.locals.bug_products[i].price * res.locals.bug_products[i].__v}`
            txt += text
        }

        txt = encode(txt)

        try {
            await telegram(txt);
        } catch (error) {
            console.log(error);
        }

        res.redirect('back')
    }
}