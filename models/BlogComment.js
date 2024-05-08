const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogCommentSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String
    },
    msg: {
        type: String,
        require: true
    },
    ofBlog: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
}, { timestamps: true });

const blogComment = mongoose.model('blog_comments', BlogCommentSchema);
blogComment.createIndexes();

module.exports = blogComment;