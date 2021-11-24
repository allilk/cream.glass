import connectDB from "../lib/mongdb";

import Recipe from "../models/recipe";
import User from "../models/user";

import imageController from "./image";
// import { generateRecipeId } from "./other";

export const getRecipe = async (id) => {
	return new Promise(async (resolve) => {
		await connectDB();

		const recipe = await Recipe.findOne({ id })
			.select("-_id -__v")
			.populate(
				"details.created_by",
				"-hash_password -email -recipes  -__v -created -refreshToken -_id"
			);
		if (recipe && recipe.image) {
			recipe.image = await imageController.get(recipe.image);
		}
		resolve(recipe);
		return;
	});
};

export const getAll = async (queryPage, queryLimit, category) => {
	return new Promise(async (resolve) => {
		await connectDB();

		const maxLimit = 100;
		const page = parseInt(queryPage) || 1;
		const limit =
			parseInt(queryLimit) > maxLimit
				? maxLimit
				: parseInt(queryLimit) || 10;
		const skipIndex = (page - 1) * limit;

		const filters = category ? { "details.category": category } : {};
		const result = await Recipe.find()
			.where(filters)
			.select("name id details thumbnail -_id")
			.sort({ "details.created": -1 })
			.limit(limit)
			.skip(skipIndex);
		resolve(result);
		return;
	});
};

export const addRecipe = async (recipe, accessToken) => {
	return new Promise(async (resolve) => {
		// await connectDB();

		// const identifier = await generateRecipeId(5);
		// console.log(recipe, identifier);
		resolve();
		return;
	});
};
