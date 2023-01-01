import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";

import Navbar from "../../components/Navbar";

const egyptian = [
  {
    id: 1,
    name: "Yes",
  },
  {
    id: 2,
    name: "No",
  },
];

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

interface GlobalState {
  email: string;
}

interface GlobalStore {
  user: GlobalState;
}

const ActiveAccount: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    egyptian: false,
    phoneNumber: "",
    nationalId: "",
  });
const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
  }
 

  const [isEgyptian, setIsEgyptian] = useState(egyptian[3]);

  const { email } = useSelector((state: GlobalStore) => state.user);
  if(!email) {
    return (
      <div>
        <h2>Not Authorized</h2>
      </div>
      )
  } else
  return (
    <div className="container">
      {/* Navbar */}
      <Navbar />
      {/* Alert */}
      <div className="relative m-2">
        <InformationCircleIcon className="text-red-500 h-8 w-8 absolute right-3 top-3" />
        <h2 className="text-2xl text-center bg-red-200 rounded-md p-2 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          You need to active your account
        </h2>
      </div>

      {/* Body */}
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            User Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal Information.
          </p>
        </div>
        <form onSubmit={onSubmit} >
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  placeholder="Type your full name"
                  name="fullName"
                  onChange={onChange}
                  className="mt-1 py-2 pl-3 block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                />
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {email}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Egyptian</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <Listbox value={isEgyptian} onChange={setIsEgyptian} >
                  {({ open }) => (
                    <>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm">
                          <span className="flex items-center">
                            <span className="ml-3 block truncate">Choose</span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {egyptian.map((person) => (
                              <Listbox.Option
                                key={person.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "text-white bg-blue-600"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                  )
                                }
                                value={person}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className="flex items-center">
                                      <span
                                        className={classNames(
                                          selected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "ml-3 block truncate"
                                        )}
                                      >
                                        {person.name}
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-blue-600",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Phone Number
              </dt>
              <dd className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="phoneNumber"
                  onChange={onChange}
                  autoComplete="off"
                  placeholder="Type your phone number"
                  className="mt-1 py-2 pl-3 block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                />
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">National ID</dt>
              <dd className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="nationalId"
                  onChange={onChange}
                  autoComplete="off"
                  placeholder="Type your national id"
                  className="mt-1 py-2 pl-3 block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                />
              </dd>
            </div>
          </dl>
          <div className="w-1/4 text-center my-2 ml-auto p-2">
          <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FingerPrintIcon
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </span>
                Save
              </button>
              </div>
              
        </div>
        </form>
      </div>
    </div>
  );
};

export default ActiveAccount;
