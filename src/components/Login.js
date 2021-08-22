import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { useForm } from "react-hook-form";

import { Header } from "./Header";
import { login } from "../actions/auth";

export const Login = (props) => {
	const { register, handleSubmit } = useForm();
	// const [result, setResult] = useState("");

	const form = useRef();
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

		// form.current.validateAll();
		// if (checkBtn.current.context._errors.length === 0) {
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
			<Header />

			<div>
				<center>
					<form onSubmit={handleLogin} ref={form}>
						<input
							{...register("username", {
								required: true,
								maxLength: 20,
							})}
							placeholder="Username"
						/>
						<br />
						<input
							{...register("password", {
								required: true,
								maxLength: 20,
							})}
							placeholder="Password"
						/>
						<br />
						<input type="submit" ref={checkBtn} />
					</form>
				</center>
			</div>
		</div>
	);
};
