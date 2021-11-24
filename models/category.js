import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	id: {
		type: String,
		unique: true,
		required: true,
	},
});
export default mongoose.models.Category ||
	mongoose.model("Category", categorySchema, "categories");
