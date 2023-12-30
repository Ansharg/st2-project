const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    imgUrl: String,
    title: String,
    caption: String,
    category: String,
});

module.exports = mongoose.model("Blog",blogSchema);