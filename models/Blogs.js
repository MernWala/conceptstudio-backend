const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
    text: {
        type: String,
        require: true
    },
    card_img: {
        type: String,
        require: true
    },
    subDetails: {
        type: String,
        require: true
    },
    details: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        default: false
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog_comments'
    }]
}, { timestamps: true });

const blogs = mongoose.model('blogs', BlogSchema);
blogs.createIndexes();

module.exports = blogs;