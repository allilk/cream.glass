import connectDB from "../../lib/mongdb";
import Category from "../../models/category";
import { generateCategoryId } from "../../helpers/other";

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

const checkForCat = () => {
	Category.find((err, results) => {
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

async function handler(req, res) {
	const { method } = req;
	return new Promise((resolve) => {
		if (method === "GET") {
			Category.find((err, result) => {
				if (err) {
					res.status(400).send({
						items: [],
						count: 0,
						message: err,
					});
				}
				if (result.length < 0) {
					checkForCat();
				}

				res.status(200).send({
					items: result,
					count: result.length,
					message: "success",
				});
				return resolve();
			});
		}
	});
}

export default connectDB(handler);
