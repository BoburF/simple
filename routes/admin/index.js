const express = require('express')
const router = express();
const admin = require('../../controller/admin/index')

router.get('/', admin.index);

router.use('/products', require('./products'))

module.exports = router