const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
	avatar: String,
	// tracks: [
	// 	{
	// 		type: mongoose.Schema.ObjectId,
	// 		ref: "Track"
	// 	}
	// ],
	description: { type: String, default: "" },
	aka: { type: String, default: "" },
	userId: String,
	img: {
		type: String,
		default:
			"https://s2.qwant.com/thumbr/0x380/d/7/9b9c8b487942e22493ac78df765dd696c5ee8a0748e1d9a9c48b5ae706a418/bad-profile-pic-2-768x768.jpeg?u=https%3A%2F%2Fwww.jennstrends.com%2Fwp-content%2Fuploads%2F2013%2F10%2Fbad-profile-pic-2-768x768.jpeg&q=0&b=1&p=0&a=1"
	}
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
