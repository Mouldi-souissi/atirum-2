const express = require("express");
const path = require("path");
const mongodb = require("./config/bd");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const fileUpload = require("express-fileupload");

const userRoute = require("./routes/user");
const track = require("./routes/Track");
const profile = require("./routes/Profile");
// body parser
app.use(express.json());

app.use(passport.initialize());
require("./middlewear/passport")(passport);
// bd connexion
mongoose.connect(
	"mongodb://localhost:27017/aterium",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	},
	err => {
		if (err) console.log(error);
		else console.log("dB connected");
	}
);

app.use(fileUpload());

// app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));

app.use("/user", userRoute);
app.use("/user/artist", track);
app.use("/user/profile", profile);

app.listen(5000, err => {
	console.log(err ? "server error" : "server is running on port 5000");
});
