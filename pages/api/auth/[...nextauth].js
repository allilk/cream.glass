import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

const providers = [
	Providers.Credentials({
		name: "Credentials",
		authorize: async (credentials) => {
			const user = await axios.post(
				"https://localhost:3000/login",
				{
					user: {
						password: credentials.password,
						email: credentials.email,
					},
				},
				{
					headers: {
						accept: "*/*",
						"Content-Type": "application/json",
					},
				}
			);

			if (user) {
				return user;
			} else {
				return null;
			}
		},
	}),
];

const callbacks = {
	// Getting the JWT token from API response
	async jwt(token, user) {
		if (user) {
			token.accessToken = user.token;
		}

		return token;
	},

	async session(session, token) {
		session.accessToken = token.accessToken;
		return session;
	},
};

const options = {
	providers,
	callbacks,
};

export default (req, res) => NextAuth(req, res, options);
