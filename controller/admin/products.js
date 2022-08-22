const Product = require('../../model/Product');
const toDelete = require('../../utils/delete');

module.exports = {
    index: async (req, res) => {
        const products = await Product.find().sort({date: -1})

        res.render('admin/products', {
            title: 'Products',
            layout: 'admin',
            error: req.flash('error'),
            products
        })
    },
    add: async (req, res) => {
        if (!req.file) {
            req.flash("error", error.message);
            return res.redirect('/admin/products')
        }

        req.body.img = '/uploads/' + req.file.filename
        const product = new Product(req.body);

        try {
            await product.save();
        } catch (error) {
            req.flash("error", error.message);
        }

        res.redirect('/admin/products')
    },
    delete: async (req, res) => {
        try {
            const deleted = await Product.findByIdAndDelete(req.params.id);
            await toDelete(deleted.img);
        } catch (error) {
            console.log(error);
        }
        res.redirect('/admin/products');
    },
    updateGet: async (req, res) => {
        const product = await Product.findById(req.params.id);

        res.render("admin/updateProduct", {
            title: product.name,
            layout: 'admin',
            product
        })
    },
    updatePost: async (req, res) => {
        try {
            await Product.findByIdAndUpdate(req.params.id, req.body);
        } catch (error) {
            console.log(error);
        }
        res.redirect('/admin/products');
    }
}