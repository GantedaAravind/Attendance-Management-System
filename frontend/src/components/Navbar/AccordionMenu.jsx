import React, { useState } from "react";
import { Link } from "react-router";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
const AccordionMenu = ({ title, subMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-start ">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex  w-full items-center justify-between  text-left font-semibold transition duration-300"
      >
        <span>{title}</span>
        <span className="transition-transform duration-300">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>

      {/* Accordion Content - Expands Below */}
      <div
        className={` overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className=" px-2  py-2 space-y-2">
          {subMenu.map((subItem, index) => (
            <li key={index}>
              <Link
                to={subItem.path}
                className="block rounded px-2 py-2 text-sm  transition"
              >
                {subItem.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccordionMenu;
