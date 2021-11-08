import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
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

mongoose.model("Recipe", ingredientSchema);
