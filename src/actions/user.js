import { FAIL_TO_GET_PROFILE, GET_PROFILE, SET_MESSAGE } from "./types";

import UserService from "../services/user.service";

export const get_profile = (identifier) => (dispatch) => {
	return UserService.get(identifier).then(
		(response) => {
			dispatch({
				type: GET_PROFILE,
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
				type: FAIL_TO_GET_PROFILE,
			});

			dispatch({
				type: SET_MESSAGE,
				payload: message,
			});

			return Promise.reject();
		}
	);
};
