import User from "../models/user";
import Recipe from "../models/recipe";
import Category from "../models/category";

import randomstring from "randomstring";

module.exports = {
	generateRecipeId: async (length) => {
		const identifier = randomstring.generate(length);

		Recipe.findOne({ id: identifier }, (err, result) => {
			if (result) {
				return this.generateRecipeId(length);
			}
		});

		return identifier;
	},
	generateUserId: async (length) => {
		const identifier = randomstring.generate(length);

		await User.findOne({ id: identifier }, async (err, result) => {
			if (result) {
				return await this.generateUserId(length);
			}
		});

		return identifier;
	},
	generateCategoryId: async (length) => {
		const identifier = randomstring.generate(length);

		await Category.findOne({ id: identifier }, async (err, result) => {
			if (result) {
				return await this.generateCategoryId(length);
			}
		});

		return identifier;
	},
};
