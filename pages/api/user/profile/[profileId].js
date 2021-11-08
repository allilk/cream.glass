import User from "../../../../models/user";

async function handler(req, res) {
	const {
		method,
		query: { profileId: id },
	} = req;

	if (method === "GET") {
		const user = await User.findOne({ id })
			.select("-hash_password -email -__v -refreshToken -_id")
			.populate(
				"recipes",
				"-ingredients -steps -details.created_by -_id -__v"
			);

		return res.status(user ? 200 : 204).send({
			user,
			message: "success",
		});
	}
}

export default handler;
