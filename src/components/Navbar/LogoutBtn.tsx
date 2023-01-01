import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiEndpoint } from "../../config";
import { logoutUser } from "../../redux/actions/userActions";

const LogoutBtn: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logout = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		axios
			.get(`${apiEndpoint}/logout`, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res);
				dispatch(
					logoutUser({
						isUserLoggedIn: false,
						id: "0",
						email: "null",
					})
				);
				navigate("/");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<button
			onClick={logout}
			className="ml-3 px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-blue-700 hover:text-white">
			Logout
		</button>
	);
};

export default LogoutBtn;
