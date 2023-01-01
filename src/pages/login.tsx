import {
	ExclamationTriangleIcon,
	LockClosedIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { apiEndpoint } from "../config";
import { loginUser } from "../redux/actions/userActions";

interface CustomError {
	value: string;
	msg: string;
	param: string;
	location: string;
}

const Login: React.FC = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState([]);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const loginUserOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true)
		axios
			.post(
				`${apiEndpoint}/login`,
				{ ...formData },
				{
					withCredentials: true,
				}
			)
			.then(({ data }) => {
				dispatch(
					loginUser({
						isUserLoggedIn: true,
						id: data.id,
						email: data.email,
						active: data.active
					})
				);
				navigate("/");
			})
			.catch((err) => {
				setErrors(err.response.data.errors);
			});
			setLoading(true)
	};

	document.title = "Egypt Railways | Login"

	return (
		<>
			<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<div>
						<Link to="/">
							<h1 className="text-center text-4xl font-bold tracking-tight text-blue-600">
								Egypt Railways
							</h1>
						</Link>
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
							Login to your account
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Or{" "}
							<Link
								to="/register"
								className="font-medium text-blue-600 hover:text-blue-500">
								Register
							</Link>
						</p>
					</div>
					<form
						className="mt-8 space-y-6"
						onSubmit={loginUserOnSubmit}>
						<input
							type="hidden"
							name="remember"
							defaultValue="true"
						/>
						<div className="-space-y-px rounded-md shadow-sm">
							<div>
								<label
									htmlFor="email-address"
									className="sr-only">
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="Email address"
									onChange={onChange}
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="Password"
									onChange={onChange}
								/>
							</div>
							{/* Errors */}
							{errors.length
								? errors.map((err: CustomError, idx) => {
										return (
											<div
												className="bg-red-100 rounded border pl-3 py-2 mb"
												key={idx}>
												<div className="flex">
													<span className="inset-y-0 left-0 flex items-center pl-3">
														<ExclamationTriangleIcon
															className="h-5 w-5 text-red-900 group-hover:text-indigo-400"
															aria-hidden="true"
														/>
													</span>
													<p className="pl-2 text-red-900">
														{err.msg}
													</p>
												</div>
											</div>
										);
								  })
								: null}
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<label
									htmlFor="remember-me"
									className="ml-2 block text-sm text-gray-900">
									Remember me
								</label>
							</div>

							<div className="text-sm">
								<Link
									to="/forgot-password"
									className="font-medium text-blue-600 hover:text-blue-500">
									Forgot your password?
								</Link>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={loading}
								className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
								<span className="absolute inset-y-0 left-0 flex items-center pl-3">
									<LockClosedIcon
										className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
										aria-hidden="true"
									/>
								</span>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
