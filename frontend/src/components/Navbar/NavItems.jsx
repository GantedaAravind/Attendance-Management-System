import React from "react";
import { Link } from "react-router"; // ✅ Fixed Import
import navbarConfig from "../../config/navbarConfig";
import AccordionMenu from "./AccordionMenu";
import { FaChevronDown } from "react-icons/fa";

const NavItems = ({ role, sidebar, onLogout }) => {
  return (
    <>
      {navbarConfig[role]?.map((item, index) => (
        <li key={index}>
          {item.subMenu ? (
            sidebar ? (
              <AccordionMenu title={item.name} subMenu={item.subMenu} />
            ) : (
              // Dropdown Menu for Nested Links
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2"
                >
                  {item.name}
                  <FaChevronDown className="pt-1" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-200 rounded-box z-10 mt-4 w-52 p-2 shadow-sm"
                >
                  {item.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link to={subItem.path}>{subItem.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ) : item.name === "Logout" ? (
            // Logout Button
            <button onClick={onLogout} className="text-red-500">
              Logout
            </button>
          ) : (
            // Single Top-Level Link
            <Link to={item.path}>{item.name}</Link>
          )}
        </li>
      ))}
    </>
  );
};

export default NavItems;
