module.exports = (req, res) => {
    res.render('404', {
        title: '404',
        layout: 'layout'
    })
}