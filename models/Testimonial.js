const mongoose = require('mongoose');
const { Schema } = mongoose;

const TestimonialSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    degi: {
        type: String,
    },
    rating: {
        type: Number,
    },
    mess: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const testimonial = mongoose.model('testimonial', TestimonialSchema);
testimonial.createIndexes();

module.exports = testimonial;