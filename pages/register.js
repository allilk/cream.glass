import { useState } from "react";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleName = (event) => {
		const value = event.target.value;
		setName(value);
	};
	const handleEmail = (event) => {
		const value = event.target.value;
		setEmail(value);
	};
	const handlePassword = (event) => {
		const value = event.target.value;
		setPassword(value);
	};

	const handleRegister = async () => {
		const response = await fetch(
			"http://localhost:3000/api/user/register",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			}
		);
	};

	return (
		<div>
			<div className="border-2 border-blue-300 mx-6 md:mx-0 md:w-1/4 h-auto bg-white rounded-md mx-auto text-center">
				<br />
				<div className="text-4xl mb-6 tracking-widest">REGISTER</div>
				<div className="mb-12">
					<div className="mb-2">
						<div className="ml-12 text-left pb-1 text-sm">Name</div>
						<div>
							<input
								className="border-2 border-blue-300 rounded px-4 py-1"
								name="name"
								onChange={handleName}
								type="text"
								maxLength="48"
								required
							/>
						</div>
						<div className="text-xs underline text-gray-500 mb-2">
							This will be used when you create recipes!
						</div>
					</div>
					<div className="mb-2">
						<div className="ml-12 text-left pb-1 text-sm">
							Email
						</div>
						<div>
							<input
								className="border-2 border-blue-300 rounded px-4 py-1"
								name="email"
								onChange={handleEmail}
								type="email"
								maxLength="64"
								required
							/>
						</div>
					</div>
					<div className="mb-2">
						<div className="ml-12 text-left pb-1 text-sm">
							Password
						</div>
						<div>
							<input
								className="border-2 border-blue-300 rounded px-4 py-1"
								name="password"
								onChange={handlePassword}
								type="password"
								maxLength="16"
								required
							/>
						</div>
					</div>
					<div className="mb-2">
						<div className="ml-12 text-left pb-1 text-sm">
							Re-enter Password
						</div>
						<div>
							<input
								className="border-2 border-blue-300 rounded px-4 py-1"
								type="password"
								maxLength="16"
								disabled
							/>
						</div>
					</div>
					<br />
					<input
						type="submit"
						onClick={handleRegister}
						className=" font-semibold w-full py-4 bg-blue-300 -mb-12 hover:bg-blue-500 cursor-pointer"
						value="Register"
					/>
				</div>
			</div>
		</div>
	);
};

export default Register;
