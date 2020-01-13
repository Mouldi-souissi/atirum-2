const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

const UserSchema = require("../models/user");

module.exports = passport => {
	passport.use(
		new JwtStrategy(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: "key"
			},
			(tokenInfo, done) => {
				UserSchema.findById(tokenInfo.id).then(user => {
					if (user) {
						return done(null, user);
					} else return done(null, false);
				});
			}
		)
	);
};
