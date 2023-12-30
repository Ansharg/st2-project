const mongoose = require('mongoose');;

const userSchema = mongoose.Schema({
    Username: {type: String,unique: true},
    Password: String,
    Admin: {type: Boolean, default: false},
});

module.exports = mongoose.model("User",userSchema);