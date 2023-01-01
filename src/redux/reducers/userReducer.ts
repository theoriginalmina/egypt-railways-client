import { ActionTypes } from "../constants/action-types";

const initialState = {
	isUserLoggedIn: false,
	id: 0,
	email: "",
	active: false
};

interface Payload {
	id: string;
	email: string;
	active: boolean;
}

interface Action {
	type: string;
	payload: Payload;
}

export const userReducer = (
	state = initialState,
	{ type, payload }: Action
) => {
	switch (type) {
		case ActionTypes.LOGIN_USER:
			return {
				...state,
				...payload,
			};
		case ActionTypes.LOGOUT_USER:
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
};
