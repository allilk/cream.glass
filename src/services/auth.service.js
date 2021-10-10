import axios from "axios";
import { API_URL } from "./service.vals";

const AUTH_API = API_URL + "/auth/";

const register = async (fullName, email, password) => {
	return await axios.post(AUTH_API + "register", {
		fullName,
		email,
		password,
	});
};

const login = async (email, password) => {
	return await axios
		.post(AUTH_API + "login", {
			email,
			password,
		})
		.then((response) => {
			if (response.data.accessToken) {
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
