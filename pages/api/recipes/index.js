import { getSession } from "next-auth/client";

import connectDB from "../../../lib/mongdb";
import Recipe from "../../../models/recipe";
import User from "../../../models/user";
import { generateRecipeId } from "../../../helpers/other";

async function handler(req, res) {
	const { method } = req;
	const session = await getSession({ req });

	return new Promise(async (resolve) => {
		await connectDB();
		if (method === "GET") {
			const maxLimit = 100;
			const page = parseInt(req.query.page) || 1;
			const limit =
				parseInt(req.query.limit) > maxLimit
					? maxLimit
					: parseInt(req.query.limit) || 10;
			const skipIndex = (page - 1) * limit;

			let filters = {};

			const allowableFilters = {
				category: "details.category",
			};
			Object.entries(allowableFilters).forEach((entry) => {
				const [key, value] = entry;

				if (req.query[key]) {
					filters[value] = req.query[key];
				}
			});
			Recipe.find()
				.where(filters)
				.select("name id details thumbnail -_id")
				.sort({ "details.created": -1 })
				.limit(limit)
				.skip(skipIndex)
				.exec((err, result) => {
					if (err) {
						res.status(400).send({
							items: [],
							count: 0,
							message: err,
						});
					} else {
						res.status(result.length > 0 ? 200 : 204).send({
							items: result,
							count: result.length,
							message: "success",
						});
					}
					return resolve();
				});
		} else if (method === "POST") {
			if (!session) {
				res.status(400).send({
					item: {},
					message: "Unauthorized!",
				});
				return resolve();
			}
			const identifier = await generateRecipeId(5);
			const recipeBody = JSON.parse(req.body);
			const userId = session.user._id;
			const newRecipe = new Recipe({
				...recipeBody,
				id: identifier,
				details: {
					created_by: userId,
					category: recipeBody.category,
				},
			});
			newRecipe.save(async (err, recipe) => {
				if (recipe) {
					const user = await User.findOne({ _id: userId });
					if (user) {
						user.recipes = [...user.recipes, recipe._id];
						user.save();
					}
					res.status(200).send({
						item: recipe,
						message: "success",
					});
				} else {
					res.status(400).send({
						item: {},
						message: err,
					});
				}
			});

			return resolve();
		}
	});
}
export default handler;
