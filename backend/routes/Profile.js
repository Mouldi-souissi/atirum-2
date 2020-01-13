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
			AKA: req.body.aka,
			userId: req.body.userId,
			tracks: req.body.userId
		});
		newProfile
			.save()
			.then(data => res.json(data))
			.catch(err => res.send(err));
	}
);

router.get("/getAllProfiles", (req, res) => {
	Profile.find()
		// .populate("tracks")
		.then(res => res.json(res))
		.catch(err => res.send(err));
});

router.get("/getProfileById/:id", (req, res) => {
	const { id } = req.params;
	Profile.findOne({ userId: id })
		.then(profile => res.json(profile))
		.catch(err => res.send(err));
});

module.exports = router;
