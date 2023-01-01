import { ActionTypes } from "../constants/action-types";

interface User {
	id: string;
	email: string;
	isUserLoggedIn: boolean;
	active?: boolean
}

export const loginUser = (user: User) => {
	return {
		type: ActionTypes.LOGIN_USER,
		payload: user,
	};
};

export const logoutUser = (user: User) => {
	return {
		type: ActionTypes.LOGOUT_USER,
		payload: user,
	};
};
