const express = require('express');
const router = express.Router();
const products = require('../../controller/admin/products');
const upload = require('../../middleware/upload')

router.get('/', products.index);

router.post('/add', upload.single('img'), products.add)

router.get('/delete/:id', products.delete)

router.get('/update/:id', products.updateGet);

router.post('/update/:id', products.updatePost);

module.exports = router