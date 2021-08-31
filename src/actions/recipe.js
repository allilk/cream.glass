import { ADD_RECIPE, SET_MESSAGE, FAIL_TO_GET_RECIPE } from "./types";
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
			return Promise.resolve();
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
