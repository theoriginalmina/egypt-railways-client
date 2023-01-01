import React from "react";
import { Link } from "react-router-dom";

const UserLinks: React.FC = () => {
  return (
    <div>
      <Link
        to="/register"
        className="px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-blue-700 hover:text-white"
      >
        Register
      </Link>
      <Link
        to="/login"
        className="ml-3 px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-blue-700 hover:text-white"
      >
        Login
      </Link>
    </div>
  );
};

export default UserLinks;
