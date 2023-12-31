const mongoose = require('mongoose');;

const userSchema = mongoose.Schema({
    Username: {type: String,unique: true, required: true},
    Password: {type:String, required: true},
    Admin: {type: Boolean, default: false},
});

module.exports = mongoose.model("User",userSchema);