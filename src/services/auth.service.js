import axios from "axios";
import { API_URL } from "./service.vals";

const AUTH_API = API_URL + "/auth/";

const register = async (username, email, password) => {
	return axios.post(AUTH_API + "register", {
		fullName: username,
		email,
		password,
	});
};

const login = async (username, password) => {
	return axios
		.post(AUTH_API + "login", {
			email: username,
			password,
		})
		.then((response) => {
			if (response.data.token) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}

			return response;
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
