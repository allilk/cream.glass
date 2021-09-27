import axios from "axios";
import ReactMarkdown from "react-markdown";
import { API_URL } from "./service.vals";

const RECIPE_API = API_URL + "/recipe/";
const defaultHeaders = {
	"content-type": "application/json",
};
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
		headers: defaultHeaders,
		data: {
			id: identifier,
		},
	}).then((resp) => {
		return resp.data;
	});
};

const get_all = (page, limit, category) => {
	let ifCategory = "";
	if (category) {
		ifCategory = `&category=${category}`;
	}
	return axios({
		url: RECIPE_API + `?page=${page}&limit=${limit}${ifCategory}`,
		method: "get",
		headers: defaultHeaders,
	});
};

const get_categories = () => {
	return axios({
		url: API_URL + "/category",
		method: "get",
		headers: defaultHeaders,
	});
};
export default {
	add,
	get,
	get_all,
	get_categories,
};
