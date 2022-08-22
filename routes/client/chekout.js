const express = require('express')
const router = express()
const chekout = require('../../controller/client/chekout')

router.get('/', chekout.home)

router.post('/message', chekout.message)

module.exports = router