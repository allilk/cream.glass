import connectDB from "../../../lib/mongdb";
import User from "../../../models/user";
import Token from "../../../models/token";

import {
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
} from "../../../helpers/jwt_helper";

async function handler(req, res) {
	try {
		const {
			method,
			body: { email, password },
		} = req;

		if (method === "POST") {
			await User.findOne({ email }, async (err, user) => {
				if (err) {
					return res.status(400).send({
						accessToken: "",
						refreshToken: "",
						message: err,
					});
				} else if (!user || !user.comparePassword(password)) {
					return res.status(401).send({
						accessToken: "",
						refreshToken: "",
						message:
							"Authentication failed. Invalid user or password.",
					});
				}
				const accessToken = await generateAccessToken(user._id);

				// if (!user.refreshToken) {
				// 	user.refreshToken = await generateRefreshToken(user._id);
				// 	user.save();
				// } else {
				// 	const validToken = await verifyRefreshToken(
				// 		user.refreshToken
				// 	);
				// 	if (!validToken) {
				// 		user.refreshToken = await generateRefreshToken(
				// 			user._id
				// 		);
				// 		user.save();
				// 	}
				// }
				return res.status(200).send({
					accessToken,
					user: {
						_id: user._id,
						id: user.id,
						fullName: user.fullName,
					},
				});
			});
		}
	} catch (err) {
		return err;
	}
}
export default connectDB(handler);
