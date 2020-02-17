const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
	// connected: { type: Boolean, default: false }
});

module.exports = user = mongoose.model("user", UserSchema);
