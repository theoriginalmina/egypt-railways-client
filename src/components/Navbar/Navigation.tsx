import React from "react";

const navigation = [
	{ name: "Trains", href: "#", current: false },
	{ name: "Buses", href: "#", current: false },
	{ name: "Flights", href: "#", current: false },
];

const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(" ");
};

const Navigation: React.FC = () => {
	return (
		<div className="hidden md:block">
			<div className="ml-10 flex items-baseline space-x-4">
				{navigation.map((item) => (
					<a
						key={item.name}
						href={item.href}
						className={classNames(
							item.current
								? "bg-blue-900 text-white"
								: "text-gray-300 hover:bg-blue-700 hover:text-white",
							"px-3 py-2 rounded-md text-sm font-medium"
						)}
						aria-current={item.current ? "page" : undefined}>
						{item.name}
					</a>
				))}
			</div>
		</div>
	);
};

export default Navigation;
