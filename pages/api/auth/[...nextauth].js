import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

const providers = [
	Providers.Credentials({
		name: "Credentials",
		credentials: {
			email: { label: "Email", type: "text" },
			password: { label: "Password", type: "password" },
		},
		async authorize(credentials) {
			const user = await axios.post(
				"http://localhost:3000/api/user/login",
				{
					password: credentials.password,
					email: credentials.email,
				},
				{
					headers: {
						accept: "*/*",
						"Content-Type": "application/json",
					},
				}
			);
			if (user) {
				return user.data;
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
