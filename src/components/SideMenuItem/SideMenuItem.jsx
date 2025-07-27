import React from "react";
import { NavLink } from "react-router-dom";

const SideMenuItem = ({ title, icon, href }) => {
  return (
    <NavLink
      className={({isActive})=>`h-[48px] flex items-center px-[18px] cursor-pointer  text-white rounded-[10px] gap-x-2.5 ${
        isActive ? "bg-[#02816E]" : ""
      }`} to={href}
    >
      {icon}

      <span className="font-normal text-base mx-auto ">{title}</span>
    </NavLink>
  );
};

export default SideMenuItem;
// bg-[#02816E]
