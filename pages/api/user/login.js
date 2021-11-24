import connectDB from "../../../lib/mongdb";
import User from "../../../models/user";

import { generateAccessToken } from "../../../helpers/jwt_helper";

const handler = async (req, res) => {
	const {
		method,
		body: { email, password },
	} = req;
	return new Promise(async (resolve) => {
		if (method === "POST") {
			await connectDB();
			try {
				await User.findOne({ email }, async (err, user) => {
					if (err) {
						res.status(400).send({
							accessToken: "",
							refreshToken: "",
							message: err,
						});
					} else if (!user || !user.comparePassword(password)) {
						res.status(401).send({
							accessToken: "",
							refreshToken: "",
							message:
								"Authentication failed. Invalid user or password.",
						});
					} else {
						const accessToken = await generateAccessToken(user._id);
						res.status(200).send({
							accessToken,
							user: {
								_id: user._id,
								id: user.id,
								fullName: user.fullName,
							},
						});
					}
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
					resolve();
					return;
				});
			} catch {}
		}
	});
};
export default handler;
