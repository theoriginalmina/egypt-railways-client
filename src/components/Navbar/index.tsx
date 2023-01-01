import { Disclosure } from "@headlessui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import ProfileDropdown from "./ProfileDropdown";
import Navigation from "./Navigation";
import Notifications from "./Notifications";
import UserLinks from "./UserLinks";
import MobileMenu from "./MobileMenu";
import MobileMenuBtn from "./MobileMenuBtn";

interface GlobalState {
  isUserLoggedIn: Boolean;
  id: string;
  email: string;
  active: boolean;
}

interface GlobalStore {
  user: GlobalState;
}

const Navbar: React.FC = () => {
  const { isUserLoggedIn, active } = useSelector(
    (state: GlobalStore) => state.user
  );

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-blue-600">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/">
                        <h1 className="text-white">Egypt Railways</h1>
                      </Link>
                    </div>
                    {/* Navigation */}
                    <Navigation />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {isUserLoggedIn ? (
                        <>
                          {/* Notifications */}
                          <Notifications userStatus={active} />

                          {/* Profile dropdown */}
                          <ProfileDropdown />

                          {/* Logout Button */}
                          <LogoutBtn />
                        </>
                      ) : (
                        <>
                          {/* User Links */}
                          <UserLinks />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <MobileMenuBtn open={open} />
                  </div>
                </div>
              </div>
              {/* Mobile Menu */}
              <MobileMenu />
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default Navbar;
