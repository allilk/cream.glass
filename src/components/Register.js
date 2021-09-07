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
	const doesPasswordMatch = (e) => {
		const repassword = e.target.value;
	};
	const handleRegister = (e) => {
		e.preventDefault();
		setSuccessful(false);

		dispatch(register(name, email, password))
			.then(() => {
				setSuccessful(true);
				props.history.push("/login");
				window.location.reload();
			})

			.catch(() => {
				setSuccessful(false);
			});
	};

	return (
		<div>
			<Message />
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
										{...register("name", {
											required: true,
											maxLength: 48,
										})}
										onChange={onChangeName}
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
										{...register("email", {
											required: true,
											maxLength: 64,
										})}
										onChange={onChangeEmail}
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
										{...register("password", {
											required: true,
											maxLength: 16,
										})}
										onChange={onChangePassword}
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
										{...register("password", {
											required: true,
											maxLength: 16,
										})}
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
								className=" font-semibold w-full py-4 bg-blue-300 -mb-12 hover:bg-blue-500 "
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
