import { FAIL_TO_GET_PROFILE, GET_PROFILE } from "./types";
import UserService from "../services/user.service";
import { ifError, dispatchError } from "./error";

export const get_profile = (identifier) => (dispatch) => {
	return UserService.getProfile(identifier).then((response) => {
		if (!ifError(response.status)) {
			dispatch({ type: GET_PROFILE });

			return Promise.resolve(response.data.user);
		} else {
			dispatch({ type: FAIL_TO_GET_PROFILE });
			dispatchError(dispatch, response.status, response.statusText);

			return Promise.reject();
		}
	});
};
