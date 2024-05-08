const mongoose = require('mongoose');

const connecToMongoose = async () => {
    await mongoose.connect(process.env.BACKEND_URI).then(() => {
        console.log('Database Connected');
    })
};

module.exports = connecToMongoose;