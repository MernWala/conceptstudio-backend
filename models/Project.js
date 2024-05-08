const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const project = mongoose.model('project', ProjectSchema);
project.createIndexes();

module.exports = project;