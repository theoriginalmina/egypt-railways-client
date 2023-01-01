import { BellIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";

const userNotifications = [
  { title: "Active your account", link: "/active-account" },
];

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

interface NotificationsProps {
  userStatus: boolean;
}

const Notifications: React.FC<NotificationsProps> = ({ userStatus }) => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full bg-blue-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800">
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-8 w-8 text-white" aria-hidden="true" />
          {!userStatus ? (
            <span className="absolute top-0 bg-red-500 text-white rounded-full w-5 h-5">
              1
            </span>
          ) : null}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-red-100 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNotifications.map((item) => (
            <Menu.Item key={item.title}>
              {({ active }) => (
                <Link
                  to={item.link}
                  className={classNames(
                    active ? "bg-red-300" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  {item.title}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Notifications;
