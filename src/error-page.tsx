import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();
	console.error(error);

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div className="flex">
				<div className="flex-auto p-2 text-4xl font-bold text-blue-600">404</div>
				<div className="flex-auto p-2">
					<h3 className="text-4xl font-bold">Page not found</h3>
					<p className="text-gray-600">
						Please check the URL in the address bar and try again.
					</p>
					<div className="mt-8">
						<Link className="rounded-md border border-transparent bg-blue-600 py-1 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" to="/">Go back home</Link>
						<Link className="ml-4 rounded-md border border-transparent bg-blue-300 py-1 px-4 text-sm font-medium text-blue-600 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" to="/">Contact support</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ErrorPage;
