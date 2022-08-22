const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = model('admin', adminSchema);