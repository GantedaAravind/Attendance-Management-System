import { Link } from "react-router";
import fingerprint_icon from "../../assets/fingerprint_icon.svg";
import NavItems from "./NavItems";
import { useSelector } from "react-redux";

const Navbar = () => {
  const role = useSelector((state) => state.auth.user?.role) ?? "guest";

  return (
    <div className="drawer shadow-xl">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <Link className="mx-1 flex-1 px-2 flex items-center gap-2 " to="/">
            <img
              src={fingerprint_icon}
              className="w-8 md:w-9 lg:w-10 "
              alt="Attendance Mangement System"
            />
            <p className="text-lg md:text-xl lg:text-2xl font-bold ">AMS</p>
          </Link>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal lg:text-lg mx-2">
              {/* Navbar menu content here */}
              <NavItems role={role} sidebar={false} />
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4  lg:text-xl md:text-lg sm:text-md text-base">
          {/* Sidebar content here */}

          <NavItems role={role} sidebar={true} />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
