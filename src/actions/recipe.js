import {
	ADD_RECIPE,
	SET_MESSAGE,
	FAIL_TO_GET_RECIPE,
	FAIL_TO_ADD_RECIPE,
	GET_RECIPE,
	GET_CATEGORIES,
	FAILED_CATEGORIES,
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
export const get_all = (page, limit, category) => (dispatch) => {
	return RecipeService.get_all(page, limit, category).then(
		(response) => {
			dispatch({ type: GET_RECIPE });

			dispatch({
				type: SET_MESSAGE,
				payload: response.message,
			});
			return Promise.resolve(response.data.items);
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
export const get_categories = () => (dispatch) => {
	return RecipeService.get_categories().then(
		(response) => {
			dispatch({ type: GET_CATEGORIES });

			dispatch({
				type: SET_MESSAGE,
				payload: response.message,
			});
			return Promise.resolve(response.data.items);
		},
		(error) => {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			dispatch({
				type: FAILED_CATEGORIES,
			});

			dispatch({
				type: SET_MESSAGE,
				payload: message,
			});

			return Promise.reject();
		}
	);
};
