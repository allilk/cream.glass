import {
	ADD_RECIPE,
	FAIL_TO_GET_RECIPE,
	FAIL_TO_ADD_RECIPE,
	GET_RECIPE,
	GET_CATEGORIES,
	FAILED_CATEGORIES,
} from "./types";
import RecipeService from "../services/recipe.service";
import { ifError, dispatchError } from "./error";

export const get_all = (page, limit, category) => (dispatch) => {
	return RecipeService.get_all(page, limit, category).then((response) => {
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
	return RecipeService.get_categories().then((response) => {
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
	return RecipeService.get(identifier).then((response) => {
		if (!ifError(response.status)) {
			dispatch({ type: GET_RECIPE });

			return Promise.resolve(response);
		} else {
			dispatch({ type: FAIL_TO_GET_RECIPE });
			dispatchError(dispatch, response.status, response.statusText);

			return Promise.reject();
		}
	});
};
export const add_recipe = (obj, accessToken) => (dispatch) => {
	return RecipeService.add(obj, accessToken).then((response) => {
		if (!ifError(response.status)) {
			dispatch({ type: ADD_RECIPE });

			return Promise.resolve(response.data);
		} else {
			dispatch({ type: FAIL_TO_ADD_RECIPE });
			dispatchError(dispatch, response.status, response.statusText);

			return Promise.reject();
		}
	});
};
