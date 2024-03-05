const mongoose = require("mongoose");
const note = new mongoose.Schema({
    username:String,
    note:String
});

const modelnote = mongoose.model("notes",note);
module.exports = modelnote;