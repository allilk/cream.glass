import axios from "axios";
const API_URL = "http://localhost:3000/recipe/";

export const getRecipe = async (identifier, token) => {
	const resp = await axios({
		url: API_URL + "get",
		method: "post",
		headers: {
			Authorization: `JWT ${token}`,
			"content-type": "application/json",
		},
		data: {
			id: identifier,
		},
	}).catch((err) => console.log(err));
	return resp;
};
