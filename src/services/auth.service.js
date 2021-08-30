import axios from "axios";

const API_URL = "https://api.cream.glass/auth/";

const register = (username, email, password) => {
	return axios.post(API_URL + "register", {
		fullName: username,
		email,
		password,
	});
};

const login = (username, password) => {
	return axios
		.post(API_URL + "login", {
			email: username,
			password,
		})
		.then((response) => {
			if (response.data.token) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}

			return response.data;
		});
};

const logout = () => {
	localStorage.removeItem("user");
};

export default {
	register,
	login,
	logout,
};
