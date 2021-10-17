import axios from "axios";

import { API_URL } from "./service.vals";

const RECIPE_API = API_URL + "/recipe";
const defaultHeaders = {
	"content-type": "application/json",
};

const addRecipe = async (obj, accessToken) => {
	const uploadImage = async () => {
		const formData = new FormData();
		formData.append("file", obj.image);

		const response = await axios({
			url: API_URL + "/image/upload",
			method: "post",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			data: formData,
		});

		return response.data.key;
	};

	if (obj.image) {
		const image = await uploadImage();
		obj.image = image;
	}

	return await axios({
		url: RECIPE_API + "/new",
		method: "post",
		headers: {
			...defaultHeaders,
			Authorization: `Bearer ${accessToken}`,
		},
		data: {
			...obj,
		},
	});
};

const getRecipe = async (identifier) => {
	return await axios({
		url: RECIPE_API + "/get",
		method: "post",
		headers: defaultHeaders,
		data: {
			id: identifier,
		},
	}).then(async (result) => {
		const recipe = {
			...result.data.item,
			// status, for error handling
			status: result.status,
			statusText: result.statusText,
		};
		const imageKey = recipe.image;

		if (imageKey) {
			const response = await axios({
				url: API_URL + "/image/get",
				method: "post",
				data: { fileKey: imageKey },
			});

			recipe.image = response.data.url;
		}

		return recipe;
	});
};
const deleteRecipe = async (identifier, accessToken) => {
	return await axios({
		url: RECIPE_API + "/delete",
		method: "post",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		data: {
			id: identifier,
		},
	});
};
const getAll = async (page, limit, category) => {
	let ifCategory = "";

	if (category) {
		ifCategory = `&category=${category}`;
	}

	return await axios({
		url: RECIPE_API + `?page=${page}&limit=${limit}${ifCategory}`,
		method: "get",
		headers: defaultHeaders,
	});
};

const getCategories = async () => {
	return await axios({
		url: API_URL + "/category",
		method: "get",
		headers: defaultHeaders,
	}).then((response) => response);
};
export default {
	addRecipe,
	getRecipe,
	deleteRecipe,
	getAll,
	getCategories,
};
