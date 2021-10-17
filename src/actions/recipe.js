import {
	ADD_RECIPE,
	FAIL_TO_GET_RECIPE,
	FAIL_TO_ADD_RECIPE,
	GET_RECIPE,
	GET_CATEGORIES,
	FAILED_CATEGORIES,
	FAIL_TO_DEL_RECIPE,
	DEL_RECIPE,
	SET_MESSAGE,
} from "./types";
import RecipeService from "../services/recipe.service";
import { ifError, dispatchError } from "./error";
import axios from "axios";

import { API_URL } from "../services/service.vals";
const RECIPE_API = API_URL + "/recipe";

export const get_all = (page, limit, category) => (dispatch) => {
	return RecipeService.getAll(page, limit, category).then((response) => {
		if (!ifError(response.status)) {
			dispatch({ type: GET_RECIPE });

			return Promise.resolve(response.data.items);
		} else {
			dispatch({ type: FAIL_TO_GET_RECIPE });
			dispatchError(dispatch, response.status, response.statusText);

			return Promise.reject();
		}
	});
};
export const get_categories = () => (dispatch) => {
	return RecipeService.getCategories().then((response) => {
		if (!ifError(response.status)) {
			dispatch({ type: GET_CATEGORIES });

			return Promise.resolve(response.data.items);
		} else {
			dispatch({ type: FAILED_CATEGORIES });
			dispatchError(dispatch, response.status, response.statusText);

			return Promise.reject();
		}
	});
};
export const get_recipe = (identifier) => (dispatch) => {
	return axios({
		url: RECIPE_API + "/get",
		method: "post",
		data: {
			id: identifier,
		},
	}).then(async (response) => {
		try {
			const recipe = response.data.item;

			if (recipe.image) {
				recipe.image = await axios({
					url: API_URL + "/image/get",
					method: "post",
					data: { fileKey: recipe.image },
				}).then((response) => response.data.url);
			}

			dispatch({ type: GET_RECIPE });

			return Promise.resolve(recipe);
		} catch {
			dispatch({ type: FAIL_TO_GET_RECIPE });

			dispatch({
				type: SET_MESSAGE,
				payload: `${response.status} : ${response.statusText}`,
			});

			return Promise.reject();
		}
	});
};
export const add_recipe = (obj, accessToken) => (dispatch) => {
	return RecipeService.addRecipe(obj, accessToken).then(
		(response) => {
			dispatch({ type: ADD_RECIPE });
			return Promise.resolve(response.data.item);
		},
		(error) => {
			dispatch({ type: FAIL_TO_ADD_RECIPE });
			dispatchError(
				dispatch,
				error.response.status,
				error.response.data.message
			);
			return Promise.reject();
		}
	);
};
export const delete_recipe = (identifier, accessToken) => (dispatch) => {
	return RecipeService.deleteRecipe(identifier, accessToken).then(
		(response) => {
			dispatch({ type: DEL_RECIPE });
			return Promise.resolve();
		},
		(error) => {
			dispatch({ type: FAIL_TO_DEL_RECIPE });
			dispatchError(
				dispatch,
				error.response.status,
				error.response.data.message
			);
			return Promise.reject();
		}
	);
};
