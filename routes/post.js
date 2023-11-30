const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/pit")

const postSchema = new mongoose.Schema({
    postText: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Array,
        default: []
    }
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
