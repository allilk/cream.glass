import Router from "next/router";
import { signIn, getSession } from "next-auth/client";
import Link from "next/link";

import { useState } from "react";

const Login = ({ session }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmail = (event) => {
		const value = event.target.value;
		setEmail(value);
	};
	const handlePassword = (event) => {
		const value = event.target.value;
		setPassword(value);
	};

	const handleLogin = () => {
		signIn("credentials", {
			email,
			password,
			callbackUrl: `${window.location.origin}`,
		});
	};

	if (session && process.browser) {
		Router.push("/");
		// return (
		// 	<>
		// 		{" "}
		// 		Signed in as {session.user.fullName} <br />{" "}
		// 		<button onClick={() => signOut()}>Sign out</button>{" "}
		// 	</>
		// );
	}
	return (
		<div>
			<br />
			<div className="border-2 border-blue-300 w-5/6 md:w-1/4 h-auto bg-white rounded-md mx-auto text-center">
				<br />
				<div className="text-4xl mb-6 tracking-widest">LOGIN</div>
				<div className="mb-12">
					<div className="ml-12 text-left pb-1 text-sm">Email</div>
					<div>
						<input
							className="border-2 border-blue-300 rounded px-4 py-1"
							onChange={handleEmail}
							type="email"
							required
						/>
					</div>
					<div className="ml-12 text-left pb-1 text-sm">Password</div>

					<div>
						<input
							className="border-2 border-blue-300 rounded px-4 py-1"
							onChange={handlePassword}
							placeholder="Password"
							type="password"
							required
						/>
					</div>
					<div className="text-xs underline text-gray-500 mb-2">
						<Link href="/forgot-password">Forgot password?</Link>
					</div>
					<br />
					<input
						type="submit"
						onClick={handleLogin}
						className=" font-semibold w-full py-4 bg-blue-300 -mb-12 hover:bg-blue-500 cursor-pointer "
						value="Login"
					/>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async (context) => {
	return {
		props: {
			session: await getSession(context),
		},
	};
};

export default Login;
