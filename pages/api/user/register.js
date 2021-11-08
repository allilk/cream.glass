import bcrypt from "bcrypt";

import connectDB from "../../../lib/mongdb";
import User from "../../../models/user";

import { generateUserId } from "../../../helpers/other";

async function handler(req, res) {
	const {
		method,
		body: { email },
	} = req;

	if (method === "POST") {
		const newUser = new User({ id: generateUserId(7), ...req.body });
		newUser.hash_password = bcrypt.hashSync(req.body.password, 10);

		User.findOne({ email }, async (err, user) => {
			if (err) {
				return res.status(400).send({
					user: {},
					message: err,
				});
			}
			if (!user) {
				await newUser.save();
				return res.status(200).send({
					user,
					message: "success",
				});
			} else {
				return res.status(403).send({
					user: {},
					message: "Email is already registered!",
				});
			}
		}).populate("-hash_password");
	}
}
export default connectDB(handler);
