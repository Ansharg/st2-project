const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    imgUrl: String,
    title: {type:String, required: true},
    caption: String,
    category: {type:String, required: true}
});

module.exports = mongoose.model("Blog",blogSchema);