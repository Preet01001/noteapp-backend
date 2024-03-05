const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username:String,
    password:String
});

const model = mongoose.model("users",user);
module.exports = model;