const mongoose = require("mongoose");

const trackSchema = mongoose.Schema({
	title: String,
	artist: {
		type: mongoose.Schema.ObjectId,
		ref: "user"
	},
	duration: String,
	style: String,
	donations: Number,
	rating: Number,
	price: String,
	video: String,
	visibilty: ["private", "public"]
});

module.exports = Track = mongoose.model("track", trackSchema);
