const mongoose = require('mongoose')

module.exports = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to database...');
    } catch (error) {
        console.log(error);
    }
}