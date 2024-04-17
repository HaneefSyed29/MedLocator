import React from "react";

const Navbar = ({ name, picture }) => {
  // this logoutHandle is responsible for the Logout action perfromed by the user
  const logoutHandle = () => {
    window.location.reload();
    localStorage.clear();
  };

  return (
    <nav className="bg-white border-b shadow-xl">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16">
          <div className="absolute inset-y-0 left-0 flex sm:hidden"></div>
          <div className="flex flex-1 sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              {/* icon */}
              <img
                className="h-12 w-auto"
                src="https://img.freepik.com/free-vector/pin-pointer-location_24877-83833.jpg"
                alt="Your Company"
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div className="flex justify-center items-center">
                <p className="block px-4 py-2  font-medium text-black">
                  {/* name of the current user */}
                  {name}
                </p>
                <div>
                  {/* profile picture of current user */}
                  <img
                    className="h-8 w-8 rounded-full"
                    src={`${picture}`}
                    alt=""
                  />
                </div>
                {/* logout button */}
                <button
                  onClick={logoutHandle}
                  className="block px-4 py-2  font-medium text-black"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
