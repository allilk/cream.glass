import User from "../models/user";
import Recipe from "../models/recipe";
import Category from "../models/category";

import randomstring from "randomstring";

module.exports = {
	generateRecipeId: (length) => {
		const identifier = randomstring.generate(length);

		Recipe.findOne({ id: identifier }, (err, result) => {
			if (result) {
				return this.generateRecipeId();
			}
		});

		return identifier;
	},
	generateUserId: (length) => {
		const identifier = randomstring.generate(length);

		User.findOne({ id: identifier }, (err, result) => {
			if (result) {
				return this.generateRecipeId();
			}
		});

		return identifier;
	},
	generateCategoryId: (length) => {
		const identifier = randomstring.generate(length);

		Category.findOne({ id: identifier }, (err, result) => {
			if (result) {
				return this.generateRecipeId();
			}
		});

		return identifier;
	},
};
