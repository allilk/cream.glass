import axios from "axios";
import { API_URL } from "./service.vals";

const RECIPE_API = API_URL + "/recipe/";

const add = (obj, token) => {
	return axios({
		url: RECIPE_API + "new",
		method: "post",
		headers: {
			Authorization: `JWT ${token}`,
			"content-type": "application/json",
		},
		data: {
			...obj,
		},
	}).catch((err) => console.log(err));
};

const get = (identifier) => {
	return axios({
		url: RECIPE_API + "get",
		method: "post",
		headers: {
			"content-type": "application/json",
		},
		data: {
			id: identifier,
		},
	}).catch((err) => console.log(err));
};

const get_all = (page, limit) => {
	return axios({
		url: RECIPE_API + `?page=${page}&limit=${limit}`,
		method: "get",
		headers: {
			"content-type": "application/json",
		},
	}).catch((err) => console.log(err));
};
export default {
	add,
	get,
	get_all,
};
