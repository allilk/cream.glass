// import { signIn } from "next-auth/client";

// const handleLogin = () => {
// 	signIn("credentials", {
// 		email,
// 		password,
// 		// The page where you want to redirect to after a
// 		// successful login
// 		callbackUrl: `${window.location.origin}/account_page`,
// 	});
// };
import { signIn, signOut, getSession } from "next-auth/client";
import Link from "next/link";

const Login = (props) => {
	const { session } = props;

	if (session) {
		return (
			<>
				{" "}
				Signed in as {session.user.fullName} <br />{" "}
				<button onClick={() => signOut()}>Sign out</button>{" "}
			</>
		);
	}

	return (
		<>
			{" "}
			Not signed in <br />{" "}
			<button onClick={() => signIn()}>Sign in</button>{" "}
		</>
	);
	// return (
	// 	<div>
	// 		{/* <Message /> */}
	// 		<br />
	// 		<center>
	// 			<div className="border-2 border-blue-300 w-5/6 md:w-1/4 h-auto bg-white rounded-md">
	// 				<br />
	// 				<div className="text-4xl mb-6 tracking-widest">LOGIN</div>
	// 				<div className="mb-12">
	// 					<form onSubmit={handleLogin}>
	// 						<div className="ml-12 text-left pb-1 text-sm">
	// 							Email
	// 						</div>
	// 						<div>
	// 							<input
	// 								className="border-2 border-blue-300 rounded px-4 py-1"
	// 								name="email"
	// 								onChange={handleChange}
	// 								type="email"
	// 								required
	// 							/>
	// 						</div>
	// 						<div className="ml-12 text-left pb-1 text-sm">
	// 							Password
	// 						</div>

	// 						<div>
	// 							<input
	// 								className="border-2 border-blue-300 rounded px-4 py-1"
	// 								name="password"
	// 								placeholder="Password"
	// 								onChange={handleChange}
	// 								type="password"
	// 								required
	// 							/>
	// 						</div>
	// 						<div className="text-xs underline text-gray-500 mb-2">
	// 							<Link href="/forgot-password">
	// 								Forgot password?
	// 							</Link>
	// 						</div>
	// 						<br />
	// 						<input
	// 							type="submit"
	// 							className=" font-semibold w-full py-4 bg-blue-300 -mb-12 hover:bg-blue-500 cursor-pointer "
	// 							value="Login"
	// 						/>
	// 					</form>
	// 				</div>
	// 			</div>
	// 		</center>
	// 	</div>
	// );
};

export async function getServerSideProps(context) {
	const session = await getSession(context);
	return { props: { session } };
}

export default Login;
