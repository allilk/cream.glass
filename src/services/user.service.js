import axios from "axios";
import { API_URL } from "./service.vals";

const USER_API = API_URL + "/auth/profile/";

const getProfile = (identifier) => {
	return axios({
		url: USER_API,
		method: "post",
		headers: {
			"content-type": "application/json",
		},
		data: {
			id: identifier,
		},
	});
};

// import authHeader from "./auth-header";

// const API_URL = "http://localhost:3000/api/test/";

// const getPublicContent = () => {
// 	return axios.get(API_URL + "all");
// };

// const getUserBoard = () => {
// 	return axios.get(API_URL + "user", { headers: authHeader() });
// };

// const getModeratorBoard = () => {
// 	return axios.get(API_URL + "mod", { headers: authHeader() });
// };

// const getAdminBoard = () => {
// 	return axios.get(API_URL + "admin", { headers: authHeader() });
// };

// export default {
// 	getPublicContent,
// 	getUserBoard,
// 	getModeratorBoard,
// 	getAdminBoard,
// };
export default { getProfile };
