import connectDB from "../lib/mongdb";
import Category from "../models/category";
import { generateCategoryId } from "./other";

const nonAlcoholic = ["soft_drinks", "juice", "tea", "coffee", "shake"];
const alcoholic = ["cider", "beer", "wine", "cocktails"];

const arrayEquals = (a, b) => {
	a.sort();
	b.sort();
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	for (let i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}

	return true;
};

const checkForCat = async () => {
	await Category.find((err, results) => {
		const presets = nonAlcoholic.concat(alcoholic);
		const newArr =
			results.length != 0
				? results.map((obj) => {
						return obj.name;
				  })
				: [];
		if (!arrayEquals(newArr, presets)) {
			console.log("Categories not found. Creating...");
			Category.deleteMany(() => {
				presets.forEach((preset) => {
					const identifier = generateCategoryId(3);
					new Category({
						name: preset,
						id: identifier,
					}).save();
				});
			});
		}
	});
};

export const getCategories = async () => {
	return new Promise(async (resolve) => {
		await connectDB();

		const categories = await Category.find();

		if (!categories) await checkForCat();
		resolve(categories);
		return;
	});
};
