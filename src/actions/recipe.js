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
				payload: response.message,
			});
			return Promise.resolve(response.data.item);
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

const ifError = (status) => {
	return status == 200 ? false : true;
};

export const get_all = (page, limit, category) => (dispatch) => {
	return RecipeService.get_all(page, limit, category).then((response) => {
		if (!ifError(response.status)) {
			dispatch({ type: GET_RECIPE });
			return Promise.resolve(response.data.items);
		} else {
			dispatch({ type: FAIL_TO_GET_RECIPE });

			dispatch({
				type: SET_MESSAGE,
				payload: `${response.status} : ${response.statusText}`,
			});

			return Promise.reject();
		}
	});
};
export const get_categories = () => (dispatch) => {
	return RecipeService.get_categories().then((response) => {
		if (!ifError(response.status)) {
			dispatch({ type: GET_CATEGORIES });

			return Promise.resolve(response.data.items);
		} else {
			dispatch({ type: FAILED_CATEGORIES });

			dispatch({
				type: SET_MESSAGE,
				payload: `${response.status} : ${response.statusText}`,
			});

			return Promise.reject();
		}
	});
};
export const get_recipe = (identifier) => (dispatch) => {
	return RecipeService.get(identifier).then((response) => {
		if (!ifError(response.status)) {
			dispatch({ type: GET_RECIPE });

			return Promise.resolve(response.data);
		} else {
			dispatch({ type: FAIL_TO_GET_RECIPE });

			dispatch({
				type: SET_MESSAGE,
				payload: `${response.status} : ${response.statusText}`,
			});

			return Promise.reject();
		}
	});
};
