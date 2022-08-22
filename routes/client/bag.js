const express = require('express')
const router = express()
const bag = require('../../controller/client/bag')

router.get('/', bag.home)

router.get('/product/:id', bag.add)

router.get('/product/:id/:mode', bag.count)

router.get('/del/product/:id', bag.del)



module.exports = router