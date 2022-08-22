const express = require('express')
const router = express()
const page = require('../../controller/client/page')
const shop = require('./shop')
const bag = require('./bag')
const chekout = require('./chekout')

router.get('/contact', page.contact)

router.get('/about', page.about)

router.get('/news', page.news)

router.use('/checkout', chekout)

router.use('/shop', shop)

router.use('/bag', bag)

router.get('/', page.home)

module.exports = router