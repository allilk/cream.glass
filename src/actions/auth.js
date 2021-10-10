import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from "./types";

import AuthService from "../services/auth.service";
import { dispatchError } from "./error";

export const login = (email, password) => (dispatch) => {
	return AuthService.login(email, password).then(
		(response) => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: { user: response.data },
			});

			return Promise.resolve();
		},
		(error) => {
			dispatch({ type: LOGIN_FAIL });
			dispatchError(
				dispatch,
				error.response.status,
				error.response.data.message
			);
			return Promise.reject();
		}
	);
};
export const register = (fullName, email, password) => (dispatch) => {
	return AuthService.register(fullName, email, password).then(
		(response) => {
			dispatch({
				type: REGISTER_SUCCESS,
				payload: { user: response.data.user },
			});

			return Promise.resolve();
		},
		(error) => {
			dispatch({ type: REGISTER_FAIL });
			dispatchError(
				dispatch,
				error.response.status,
				error.response.data.message
			);

			return Promise.reject();
		}
	);
};

export const logout = () => (dispatch) => {
	AuthService.logout();

	dispatch({
		type: LOGOUT,
	});
};
