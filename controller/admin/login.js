const Admin = require('../../model/Admin');

module.exports = {
    get: (req, res) => {
        res.render('admin/login', {
            title: 'Login',
            layout: 'auth',
            error: req.flash('error')
        })
    },
    post: async (req, res) => {
        if (!req.body.name || !req.body.password) {
            req.flash('error', 'Username and password is required!');
            res.redirect('/admin/login');
            return
        }

        const admin = await Admin.findOne({ name: req.body.name, password: req.body.password, });

        if (!admin) {
            req.flash('error', 'Username or password is incorrect!');
            return res.redirect('/admin/login')
        }

        req.session.admin = admin
        res.redirect('/admin')
    },
}