import {
	GET_RECIPE,
	FAIL_TO_GET_RECIPE,
	ADD_RECIPE,
	FAIL_TO_ADD_RECIPE,
	DEL_RECIPE,
	FAIL_TO_DEL_RECIPE,
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_RECIPE:
			return {
				...state,
			};
		case FAIL_TO_GET_RECIPE:
			return {
				...state,
			};
		case ADD_RECIPE:
			return {
				...state,
			};
		case FAIL_TO_ADD_RECIPE:
			return {
				...state,
			};
		case DEL_RECIPE:
			return {
				...state,
			};
		case FAIL_TO_DEL_RECIPE:
			return {
				...state,
			};
		default:
			return state;
	}
}
