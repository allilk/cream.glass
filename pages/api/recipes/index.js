import connectDB from "../../../lib/mongdb";
import Recipe from "../../../models/recipe";

async function handler(req, res) {
	const { method } = req;

	return new Promise((resolve) => {
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
		}
	});
}
export default connectDB(handler);
