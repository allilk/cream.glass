import bcrypt from "bcryptjs";

import connectDB from "../../../lib/mongdb";
import User from "../../../models/user";

import { generateUserId } from "../../../helpers/other";

async function handler(req, res) {
	const {
		method,
		body: { email, name, password },
	} = req;

	return new Promise(async (resolve) => {
		if (method === "POST") {
			await connectDB();
			const newUser = new User({
				id: await generateUserId(7),
				email,
				name,
			});

			newUser.hash_password = bcrypt.hashSync(password, 10);

			User.findOne({ email }, async (err, user) => {
				if (err) {
					res.status(400).send({
						user: {},
						message: err,
					});
				}
				if (!user) {
					await newUser.save();
					res.status(200).send({
						message: "success",
					});
				} else {
					res.status(403).send({
						user: {},
						message: "Email is already registered!",
					});
				}
			}).populate("-hash_password");
			resolve();
			return;
		}
	});
}
export default handler;
