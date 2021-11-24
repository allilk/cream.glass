import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User from "../../../models/user";
import { generateAccessToken } from "../../../helpers/jwt_helper";

const providers = [
	Providers.Credentials({
		name: "Credentials",
		credentials: {
			email: { label: "Email", type: "text" },
			password: { label: "Password", type: "password" },
		},
		async authorize({ email, password }) {
			const existingUser = await User.findOne({ email });
			if (existingUser && existingUser.comparePassword(password)) {
				// Authentication success
				const accessToken = await generateAccessToken(existingUser._id);
				return {
					accessToken,
					user: existingUser,
				};
			} else {
				// Authentication fail
				return null;
			}
		},
	}),
];

const callbacks = {
	// Getting the JWT token from API response
	async jwt(token, user) {
		if (user) {
			token = user;
		}
		return token;
	},

	async session(session, token) {
		session.accessToken = token.accessToken;
		session.user = token.user;

		return session;
	},
};

const options = {
	NEXTAUTH_URL: process.env.NEXTAUTH_URL,
	pages: {
		signIn: "/login",
		signOut: "/logout",
	},
	providers,
	callbacks,
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	database: process.env.MONGODB_URI,
	secret: process.env.ACCESS_SECRET,
};

export default (req, res) => NextAuth(req, res, options);
