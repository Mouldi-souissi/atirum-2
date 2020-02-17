const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const passport = require("passport");

router.post(
	"/addProfile",
	// passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const newProfile = new Profile({
			description: req.body.description,
			aka: req.body.aka,
			userId: req.body.userId,
			img: req.body.img
			// tracks: req.body.userId
		});
		newProfile
			.save()
			.then(data => res.json(data))
			.catch(err => res.send(err));
	}
);

router.get("/getAllProfiles", (req, res) => {
	Profile.find()
		.then(profile => res.send(profile))
		.catch(err => res.send(err));
	// .populate("tracks")
});

router.get("/getProfileById/:id", (req, res) => {
	const { id } = req.params;
	Profile.findOne({ userId: id })
		.then(profile => res.json(profile))
		.catch(err => res.send(err));
});

router.put("/editProfile/:id", (req, res) => {
	const { id } = req.params;
	Profile.findOneAndUpdate({ userId: id }, req.body)
		.then(profile => res.json(profile))
		.catch(err => res.send(err));
});

module.exports = router;
