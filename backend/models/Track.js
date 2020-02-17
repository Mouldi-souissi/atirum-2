const mongoose = require("mongoose");

const trackSchema = mongoose.Schema({
	title: String,
	// artist: {
	// 	type: mongoose.Schema.ObjectId,
	// 	ref: "user"
	// },
	artist: String,
	artistID: String,
	duration: String,
	genre: String,
	donations: { type: Number, default: 0 },
	rating: Number,
	price: Number,
	video: String,
	videoUrl: { type: String, default: "" },
	visibilty: ["private", "public"]
});

module.exports = Track = mongoose.model("track", trackSchema);
