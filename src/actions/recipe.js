import {
	ADD_RECIPE,
	SET_MESSAGE,
	FAIL_TO_GET_RECIPE,
	FAIL_TO_ADD_RECIPE,
	GET_RECIPE,
} from "./types";
import RecipeService from "../services/recipe.service";

export const add_recipe = (obj, token) => (dispatch) => {
	return RecipeService.add(obj, token).then(
		(response) => {
			dispatch({
				type: ADD_RECIPE,
			});

			dispatch({
				type: SET_MESSAGE,
				payload: response.data.message,
			});
			return Promise.resolve(response.data);
		},
		(error) => {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			dispatch({
				type: FAIL_TO_ADD_RECIPE,
			});

			dispatch({
				type: SET_MESSAGE,
				payload: message,
			});

			return Promise.reject(message);
		}
	);
};
export const get_recipe = (identifier) => (dispatch) => {
	return RecipeService.get(identifier).then(
		(response) => {
			dispatch({ type: GET_RECIPE });

			dispatch({
				type: SET_MESSAGE,
				payload: response.data.message,
			});
			return Promise.resolve(response);
		},
		(error) => {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			dispatch({
				type: FAIL_TO_GET_RECIPE,
			});

			dispatch({
				type: SET_MESSAGE,
				payload: message,
			});

			return Promise.reject();
		}
	);
};
export const get_all = (page, limit) => (dispatch) => {
	return RecipeService.get_all(page, limit).then(
		(response) => {
			dispatch({ type: GET_RECIPE });

			dispatch({
				type: SET_MESSAGE,
				payload: response.data.message,
			});
			return Promise.resolve(response);
		},
		(error) => {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			dispatch({
				type: FAIL_TO_GET_RECIPE,
			});

			dispatch({
				type: SET_MESSAGE,
				payload: message,
			});

			return Promise.reject();
		}
	);
};
