import axios from "axios";
const API_URL = "http://localhost:3000/recipe/";

export const getRecipe = async (identifier) => {
	const resp = await axios({
		url: API_URL + "get",
		method: "post",
		headers: {
			// Authorization: `JWT ${token}`,
			"content-type": "application/json",
		},
		data: {
			id: identifier,
		},
	}).catch((err) => console.log(err));
	return resp;
};

export const getAll = async (page, limit) => {
	const resp = await axios({
		url: API_URL + `?page=${page}&limit=${limit}`,
		method: "get",
		headers: {
			// Authorization: `JWT ${token}`,
			"content-type": "application/json",
		},
	}).catch((err) => console.log(err));
	return resp;
};
