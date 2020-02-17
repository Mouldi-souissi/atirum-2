const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/register", (req, res) => {
	const newUser = new User({
		email: req.body.email,
		password: req.body.password
	});

	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(req.body.password, salt, (err, hash) => {
			newUser.password = hash;
			newUser
				.save()
				.then(data => res.json(data))
				.catch(err => res.send(err));
		});
	});
});

router.post("/login", (req, res) => {
	User.findOneAndUpdate({ email: req.body.email }, { connected: true }).then(
		user => {
			if (!user) res.send("invalid credentials");
			else {
				bcrypt
					.compare(req.body.password, user.password)
					.then(correctPassword => {
						if (correctPassword) {
							const payload = {
								id: user.id,
								email: user.email,
								connected: true
							};
							jwt.sign(payload, "key", { expiresIn: 3600 }, (err, token) => {
								res.json({ token: "Bearer " + token });
							});
						} else res.send("invalid credentials");
					});
			}
		}
	);
});

router.get(
	"/getUser",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.json(req.user);
	}
);

//get all artists
router.get("/getAllArtists", (req, res) => {
	user
		.find()
		.then(artists => res.json(artists))
		.catch(err => res.json(err));
});
//get artist by id
router.get("/getArtistBy/:_id", (req, res) => {
	const { _id } = req.params;
	user
		.findOne({ _id })
		.then(artist => res.send(artist))
		.catch(err => res.json(err));
});
module.exports = router;
