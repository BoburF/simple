const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = moment().format('DDMMYYYY-hhmmss')
        cb(null, uniqueSuffix + '-' + Math.floor(Math.random() * 9999999) + '-' + file.originalname)
    }
})

const allowedTypes = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp']

function fileFilter(req, file, cb) {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(null, false)
        cb(new Error('I don\'t have a clue!'))
    }
}

module.exports = multer({
    storage,
    fileFilter
})