const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
const entrySchema = mongoose.Schema({
    date: String,
    entry: String
});
module.exports = mongoose.model("DiaryEntry", entrySchema)