import User from "../../../../models/user";

async function handler(req, res) {
	const { method } = req;

	if (method === "GET") {
		const users = await User.find()
			.select("-hash_password -email -__v -refreshToken -_id")
			.populate(
				"recipes",
				"-ingredients -steps -details.created_by -_id -__v"
			);

		return res.status(users ? 200 : 204).send({
			users,
			message: "success",
		});
	}
}

export default handler;
