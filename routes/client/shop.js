const express = require('express')
const router = express()
const shop = require('../../controller/client/shop')

router.get('/:page', shop.home)

router.get('/products/:id', shop.productOne)

module.exports = router