import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../actions/auth";
import { Message } from "../Message";

export const Register = (props) => {
	const { isLoggedIn: auth } = useSelector((state) => state.auth);
	if (auth) {
		props.history.push("/");
	}
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		fullName: "",
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
	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};
	const doesPasswordMatch = (e) => {
		const repassword = e.target.value;
	};
	const handleRegister = (e) => {
		e.preventDefault();
		dispatch(register(...Object.values(form))).then(() => {
			props.history.push("/login");
			window.location.reload();
		});
	};

	return (
		<div>
			<Message />
			<br />
			<center>
				<div className="border-2 border-blue-300 mx-6 md:mx-0 md:w-1/4 h-auto bg-white rounded-md">
					<br />
					<div className="text-4xl mb-6 tracking-widest">
						REGISTER
					</div>
					<div className="mb-12">
						<form className="contents" onSubmit={handleRegister}>
							<div className="mb-2">
								<div className="ml-12 text-left pb-1 text-sm">
									Name
								</div>
								<div>
									<input
										className="border-2 border-blue-300 rounded px-4 py-1"
										name="fullName"
										onChange={handleChange}
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
										onChange={handleChange}
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
										onChange={handleChange}
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
										onChange={onChangePassword}
										type="password"
										maxLength="16"
										disabled
									/>
								</div>
							</div>
							<br />
							<input
								type="submit"
								className=" font-semibold w-full py-4 bg-blue-300 -mb-12 hover:bg-blue-500 cursor-pointer"
								value="Register"
							/>
						</form>
					</div>
				</div>
			</center>
		</div>
	);
};
