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
	}).then((resp) => {
		return resp.data;
	});
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
	}).then((resp) => {
		return resp.data;
	});
};

const get_all = (page, limit, category) => {
	return axios({
		url: RECIPE_API + `?page=${page}&limit=${limit}&category=${category}`,
		method: "get",
		headers: {
			"content-type": "application/json",
		},
	}).then((resp) => {
		return resp.data;
	});
};
export default {
	add,
	get,
	get_all,
};
