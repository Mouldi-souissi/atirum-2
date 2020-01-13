const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
	avatar: String,
	// tracks: [
	// 	{
	// 		type: mongoose.Schema.ObjectId,
	// 		ref: "Track"
	// 	}
	// ],
	description: String,
	AKA: String,
	userId: String
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
