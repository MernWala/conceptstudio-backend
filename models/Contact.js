const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    mess: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const contact = mongoose.model('contact', ContactSchema);
contact.createIndexes();

module.exports = contact;