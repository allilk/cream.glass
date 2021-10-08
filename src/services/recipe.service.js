import axios from "axios";

import { API_URL } from "./service.vals";
const RECIPE_API = API_URL + "/recipe/";
const defaultHeaders = {
	"content-type": "application/json",
};
const add = async (obj, token) => {
	const uploadImage = async () => {
		const formData = new FormData();
		formData.append("file", obj.image);
		const response = await axios({
			url: API_URL + "/image/upload",
			method: "post",
			headers: {
				Authorization: `JWT ${token}`,
			},
			data: formData,
		});
		return response.data.key;
	};
	if (obj.image) {
		obj.image = await uploadImage();
	}
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
	}).then(async (recipe) => {
		const imageKey = recipe.data.image;
		const response = await axios({
			url: API_URL + "/image/get",
			method: "post",
			data: { fileKey: imageKey },
		});

		recipe.data.image = response.data.url;
		return recipe;
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
