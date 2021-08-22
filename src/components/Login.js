import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { login } from "../actions/auth";

export const Login = (props) => {
	const { register, handleSubmit } = useForm();
	const checkBtn = useRef();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const { isLoggedIn } = useSelector((state) => state.auth);
	const { message } = useSelector((state) => state.message);

	const dispatch = useDispatch();

	const onChangeUsername = (e) => {
		const username = e.target.value;
		setUsername(username);
	};

	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};

	const handleLogin = (e) => {
		e.preventDefault();

		setLoading(true);

		// if (checkBtn.current.context._errors.length === 0) {
		console.log(`${username} : ${password}`);
		dispatch(login(username, password))
			.then(() => {
				props.history.push("/");
				window.location.reload();
			})
			.catch(() => {
				setLoading(false);
			});
		// } else {
		// 	setLoading(false);
		// }
	};

	if (isLoggedIn) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			<br />
			<br />
			<center>
				<div className="border-2 border-blue-300 w-3/4 md:w-1/4 h-80">
					<br />
					<div className="text-4xl mb-6 tracking-widest">LOGIN</div>
					<div className="mb-12">
						<form onSubmit={handleLogin}>
							<input
								className="border-2 border-blue-300 rounded px-4 py-1"
								{...register("username", {
									required: true,
									maxLength: 20,
								})}
								placeholder="Email"
								onChange={onChangeUsername}
							/>
							<br />
							<br />
							<input
								className="border-2 border-blue-300 rounded px-4 py-1"
								{...register("password", {
									required: true,
									maxLength: 20,
								})}
								placeholder="Password"
								onChange={onChangePassword}
							/>
							<br />
							<div className="text-sm underline text-gray-500 my-4">
								<Link to="/forgot-password">
									Forgot password?
								</Link>
							</div>
							<input
								type="submit"
								className="rounded-full font-semibold px-8 py-2 bg-blue-300 hover:bg-blue-500"
								ref={checkBtn}
								value="Login"
							/>
							<br />
						</form>
					</div>
				</div>
			</center>
		</div>
	);
};
