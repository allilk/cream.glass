import connectDB from "../../../lib/mongdb";
import Recipe from "../../../models/recipe";
import User from "../../../models/user";

import { generateRecipeId } from "../../../helpers/other";
import imageController from "../../../helpers/image";

async function handler(req, res) {
	const {
		method,
		query: { recipeId: id },
	} = req;

	if (method === "GET") {
		// Get recipe
		const recipe = await Recipe.findOne({ id }).populate(
			"details.created_by",
			"-hash_password -email -recipes  -__v -created -refreshToken"
		);

		if (recipe.image) {
			recipe.image = await imageController.get(recipe.image);
		}

		return res.status(recipe ? 200 : 204).send({
			item: recipe,
			message: "success",
		});
	} else if (method === "POST") {
		// Create recipe
		const identifier = generateRecipeId(5);
		const userId = req.payload.aud;
		const { newAccessToken } = req.payload;

		// const newRecipe = new Recipe({
		// 	...req.body,
		// 	id: identifier,
		// 	details: { created_by: userId, category: req.body.category },
		// });

		// newRecipe.save(async (err, result) => {
		// 	if (err) {
		// 		return res.status(400).send({
		// 			newAccessToken,
		// 			item: {},
		// 			message: err,
		// 		});
		// 	} else {
		// 		const user = await User.findOne({ _id: userId });
		// 		if (user) {
		// 			user.recipes = [...user.recipes, result._id];
		// 			user.save();
		// 		}
		// 		return res.status(200).send({
		// 			newAccessToken,
		// 			item: result,
		// 			message: "success",
		// 		});
		// 	}
		// });
	} else if (method === "PUT") {
		// Update recipe
	} else if (method === "DELETE") {
		// Delete recipe
		const recipe = await Recipe.findOneAndDelete({ id });
		const user = recipe.details.created_by;

		if (recipe.image) {
			ImageController.delete(recipe.image);
		}

		await User.findByIdAndUpdate(
			{ _id: user },
			{ $pull: { recipes: recipe._id } },
			(err, result) => {
				if (err) {
					return res.status(400).send({
						user: "",
						message: err,
					});
				}
				return res.status(204).send({
					message: "success",
				});
			}
		);
	}
}
export default connectDB(handler);
