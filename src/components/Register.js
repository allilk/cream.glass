import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { register, login } from "../actions/auth";
import { Message } from "./Message";

export const Register = (props) => {
	const checkBtn = useRef();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [successful, setSuccessful] = useState(false);

	const { isLoggedIn } = useSelector((state) => state.auth);
	const { message } = useSelector((state) => state.message);

	const dispatch = useDispatch();

	const onChangeName = (e) => {
		const name = e.target.value;
		setName(name);
	};

	const onChangeEmail = (e) => {
		const email = e.target.value;
		setEmail(email);
	};

	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};

	const handleRegister = (e) => {
		e.preventDefault();
		setSuccessful(false);

		dispatch(register(name, email, password))
			.then(() => {
				setSuccessful(true);
			})

			.catch(() => {
				setSuccessful(false);
			});
	};

	// if (isLoggedIn) {
	// 	return <Redirect to="/" />;
	// }
	return (
		<div>
			<Message />
			<center>
				<div className="border-2 border-blue-300 w-5/6 md:w-1/4 h-auto">
					<br />
					<div className="text-4xl mb-6 tracking-widest">
						REGISTER
					</div>
					<div className="mb-12">
						<form onSubmit={handleRegister}>
							<input
								className="border-2 border-blue-300 rounded px-4 py-1"
								{...register("name", {
									required: true,
									maxLength: 48,
								})}
								placeholder="Name"
								onChange={onChangeName}
								type="text"
								maxLength="48"
								required
							/>
							<br />
							<br />
							<input
								className="border-2 border-blue-300 rounded px-4 py-1"
								{...register("email", {
									required: true,
									maxLength: 64,
								})}
								placeholder="Email"
								onChange={onChangeEmail}
								type="email"
								maxLength="64"
								required
							/>
							<br />
							<br />
							<input
								className="border-2 border-blue-300 rounded px-4 py-1"
								{...register("password", {
									required: true,
									maxLength: 16,
								})}
								placeholder="Password"
								onChange={onChangePassword}
								type="password"
								maxLength="16"
								required
							/>
							<br />
							<br />
							<input
								type="submit"
								className="rounded-full font-semibold px-8 py-2 bg-blue-300 hover:bg-blue-500"
								ref={checkBtn}
								value="Register"
							/>
						</form>
					</div>
				</div>
			</center>
		</div>
	);
};
