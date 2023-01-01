import { Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const userNavigation = [
	{ name: "Your Profile", href: "/profile" },
	{ name: "Settings", href: "/settings" },
];

const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(" ");
};

const ProfileDropdown: React.FC = () => {
	return (
		<Menu as="div" className="relative ml-3">
			<div>
				<Menu.Button className="flex max-w-xs items-center rounded-full bg-blue-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800">
					<span className="sr-only">Open user menu</span>
					<UserIcon
						className="h-8 w-8 rounded-full text-white"
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95">
				<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					{userNavigation.map((item) => (
						<Menu.Item key={item.name}>
							{({ active }) => (
								<Link
									to={item.href}
									className={classNames(
										active ? "bg-gray-100" : "",
										"block px-4 py-2 text-sm text-gray-700"
									)}>
									{item.name}
								</Link>
							)}
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default ProfileDropdown;
