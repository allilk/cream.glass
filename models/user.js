import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: true,
	},
	hash_password: {
		type: String,
	},
	created: {
		type: Date,
		default: Date.now,
	},
	recipes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Recipe",
			required: true,
		},
	],
	id: {
		type: String,
		unique: true,
		required: true,
	},
	refreshToken: {
		type: String,
	},
});

// userSchema.methods.comparePassword = function (password) {
// 	return bcrypt.compareSync(password, this.hash_password);
// };

export default mongoose.models.User || mongoose.model("User", userSchema);
