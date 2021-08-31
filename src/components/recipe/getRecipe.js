import axios from "axios";
import { API_URL } from "../../services/service.vals";

const RECIPE_API = API_URL + "/recipe/";

export const getRecipe = async (identifier) => {
	const resp = await axios({
		url: RECIPE_API + "get",
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
		url: RECIPE_API + `?page=${page}&limit=${limit}`,
		method: "get",
		headers: {
			// Authorization: `JWT ${token}`,
			"content-type": "application/json",
		},
	}).catch((err) => console.log(err));
	return resp;
};
