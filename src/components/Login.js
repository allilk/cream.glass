import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { login } from "../actions/auth";
import { Message } from "./Message";

export const Login = (props) => {
	const { register, handleSubmit } = useForm();
	const checkBtn = useRef();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [message, setMessage] = useState("");

	const { isLoggedIn } = useSelector((state) => state.auth);
	const { message } = useSelector((state) => state.message);

	const dispatch = useDispatch();

	const onChangeEmail = (e) => {
		const email = e.target.value;
		setEmail(email);
	};

	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};

	const handleLogin = (e) => {
		e.preventDefault();

		dispatch(login(email, password)).then(() => {
			props.history.push("/");
			window.location.reload();
		});
	};

	if (isLoggedIn) {
		return <Redirect to="/" />;
	}
	return (
		<div>
			<center>
				<Message />

				<div className="border-2 border-blue-300 w-5/6 md:w-1/4 h-auto bg-white rounded-md">
					<br />
					<div className="text-4xl mb-6 tracking-widest">LOGIN</div>
					<div className="mb-12">
						<form onSubmit={handleLogin}>
							<div className="ml-12 text-left pb-1 text-sm">
								Email
							</div>
							<div>
								<input
									className="border-2 border-blue-300 rounded px-4 py-1"
									{...register("email", {
										required: true,
									})}
									onChange={onChangeEmail}
									type="email"
									required
								/>
							</div>
							<div className="ml-12 text-left pb-1 text-sm">
								Password
							</div>

							<div>
								<input
									className="border-2 border-blue-300 rounded px-4 py-1"
									{...register("password", {
										required: true,
										maxLength: 20,
									})}
									placeholder="Password"
									onChange={onChangePassword}
									type="password"
									required
								/>
							</div>
							<div className="text-xs underline text-gray-500 mb-2">
								<Link to="/forgot-password">
									Forgot password?
								</Link>
							</div>
							{/* <input
								type="submit"
								className="rounded-full font-semibold px-8 py-2 bg-blue-300 hover:bg-blue-500"
								ref={checkBtn}
								value="Login"
							/> */}
							<br />
							<input
								type="submit"
								className=" font-semibold w-full py-4 bg-blue-300 -mb-12 hover:bg-blue-500 "
								ref={checkBtn}
								value="Login"
							/>
						</form>
					</div>
				</div>
			</center>
		</div>
	);
};
