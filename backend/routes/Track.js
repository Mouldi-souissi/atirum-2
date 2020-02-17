const express = require("express");
const router = express.Router();
const Track = require("../models/Track");
const passport = require("passport");
const path = require("path");

router.post(
	"/addTrack",
	// passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const newTrack = new Track({
			title: req.body.track.title,
			artist: req.body.artist,
			artistID: req.body.artistID,
			duration: req.body.duration,
			price: req.body.track.price,
			style: req.body.style,
			videoUrl: req.body.track.videoUrl
			// donations: req.body.donations
		});
		newTrack
			.save()
			.then(data => res.json(data))
			.catch(err => res.send(err));
	}
);

router.get("/getAllTracks", (req, res) => {
	Track.find()
		// .populate("artist")
		.then(tracks => res.json(tracks))
		.catch(err => res.json(err));
});

router.get("/getTracksBy/:artist", (req, res) => {
	const { artist } = req.params;
	Track.find({ artistID: artist })
		.then(tracks => res.json(tracks))
		.catch(err => res.send("error"));
});

// get track by id

router.get("/getTrackBy/:id", (req, res) => {
	const { id } = req.params;
	Track.find({ _id: id })
		.then(track => res.json(track))
		.catch(err => res.send(err));
});

router.delete(
	"/deleteTrackById/:_id",
	// passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { _id } = req.params;
		Track.findOneAndDelete({ _id })
			.then(track => res.send("track deleted"))
			.catch(err => res.send("error"));
	}
);

router.put(
	"/editTrack/:id",
	// passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { id } = req.params;

		Track.findByIdAndUpdate({ _id: id }, req.body, {
			new: true
		})
			.then(editedTrack => res.json(editedTrack))
			.catch(err => res.send("error"));
	}
);

router.post(
	"/upload/:id",
	// "/upload",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (!req.files) {
			res.send("Please upload a file");
		}
		console.log(req.files);
		const file = req.files.file;

		if (!file.mimetype.startsWith("video")) {
			res.send("Please upload a video");
		}
		file.name = `video_${String(req.params.id)}${path.parse(file.name).ext}`;
		// file.name = `video_${path.parse(file.name).ext}`;
		file.mv(`./public/${file.name}`, async err => {
			if (err) {
				console.log(err);
			}
			const updatedTrack = await Track.findByIdAndUpdate(req.params.id, {
				video: file.name
			});

			res.json({
				track: updatedTrack
			});
		});
	}
);

// router.post("/upload", function(req, res) {
// 	let sampleFile;
// 	let uploadPath;

// 	if (!req.files || Object.keys(req.files).length === 0) {
// 		res.status(400).send("No files were uploaded.");
// 		return;
// 	}

// 	console.log("req.files >>>", req.files); // eslint-disable-line

// 	sampleFile = req.files.sampleFile;

// 	uploadPath = __dirname + "/uploads/" + sampleFile.name;

// 	sampleFile.mv(uploadPath, function(err) {
// 		if (err) {
// 			return res.status(500).send(err);
// 		}
// 	});
// });

module.exports = router;
