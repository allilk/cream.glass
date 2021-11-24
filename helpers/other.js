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

		User.findOne({ id: identifier }, async (err, result) => {
			if (result) {
				return this.generateUserId(length);
			}
		});

		return identifier;
	},
	generateCategoryId: async (length) => {
		const identifier = randomstring.generate(length);

		Category.findOne({ id: identifier }, async (err, result) => {
			if (result) {
				return this.generateCategoryId(length);
			}
		});

		return identifier;
	},
};
