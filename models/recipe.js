import mongoose from "mongoose";
import User from "../models/user";

const recipeSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	image: {
		type: String,
	},
	thumbnail: { type: String },
	ingredients: [
		{
			name: {
				type: String,
				required: true,
			},
			amount: {
				type: String,
				required: true,
			},
			measure: {
				type: String,
				required: true,
			},
		},
	],
	steps: {
		type: String,
		required: true,
	},
	details: {
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		created: {
			type: Date,
			default: Date.now,
		},
		// updated_by: {
		//   type: Schema.Types.ObjectId,
		//   ref: "User",
		// },
		updated_last: {
			type: Date,
			default: Date.now,
		},
		category: {
			type: String,
		},
		alcoholic: {
			type: Boolean,
			default: false,
		},
	},
	id: {
		type: String,
		unique: true,
		required: true,
	},
});

export default mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);
