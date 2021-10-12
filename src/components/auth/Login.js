import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { login } from "../../actions/auth";
import { Message } from "../Message";

export const Login = (props) => {
	const { isLoggedIn: auth } = useSelector((state) => state.auth);
	if (auth) {
		props.history.push("/");
	}
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		const key = event.target.name;
		const value = event.target.value;
		setForm({
			...form,
			[key]: value,
		});
	};

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(login(...Object.values(form))).then(() => {
			props.history.push("/");
			window.location.reload();
		});
	};

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
									name="email"
									onChange={handleChange}
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
									name="password"
									placeholder="Password"
									onChange={handleChange}
									type="password"
									required
								/>
							</div>
							<div className="text-xs underline text-gray-500 mb-2">
								<Link to="/forgot-password">
									Forgot password?
								</Link>
							</div>
							<br />
							<input
								type="submit"
								className=" font-semibold w-full py-4 bg-blue-300 -mb-12 hover:bg-blue-500 "
								value="Login"
							/>
						</form>
					</div>
				</div>
			</center>
		</div>
	);
};
