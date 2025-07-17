import React from "react";
<<<<<<< HEAD

const SideMenuItem = ({ title, icon, href, isActive }) => {
  return (
    <div
      className={`h-[48px] flex items-center px-[18px] cursor-pointer  text-white rounded-[10px] gap-x-2.5 ${
        isActive ? "bg-[#02816E]" : ""
      }`}
=======
import { NavLink } from "react-router-dom";

const SideMenuItem = ({ title, icon, href }) => {
  return (
    <NavLink
      className={({isActive})=>`h-[48px] flex items-center px-[18px] cursor-pointer  text-white rounded-[10px] gap-x-2.5 ${
        isActive ? "bg-[#02816E]" : ""
      }`} to={href}
>>>>>>> c51ed5d (Add solution for challenge 2)
    >
      {icon}

      <span className="font-normal text-base mx-auto ">{title}</span>
<<<<<<< HEAD
    </div>
=======
    </NavLink>
>>>>>>> c51ed5d (Add solution for challenge 2)
  );
};

export default SideMenuItem;
// bg-[#02816E]
