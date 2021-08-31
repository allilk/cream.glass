import axios from "axios";

const API_URL = "http://localhost:3000/recipe/";

const add = (obj, token) => {
	return axios({
		url: API_URL + "new",
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

export default {
	add,
};
