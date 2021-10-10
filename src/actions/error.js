import { SET_MESSAGE } from "./types";

export const ifError = (status) => {
	return status == 200 ? false : true;
};
export const dispatchError = (dispatch, status, statusText) => {
	dispatch({
		type: SET_MESSAGE,
		payload: `${status} : ${statusText}`,
	});
};
