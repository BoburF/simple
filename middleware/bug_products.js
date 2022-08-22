module.exports = (req, res, next) => {
    res.locals.bug_products = JSON.parse(req.cookies.products ? req.cookies.products : '[]')
    next()
}