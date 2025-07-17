import React from "react";

const SideMenuItem = ({ title, icon, href, isActive }) => {
  return (
    <div
      className={`h-[48px] flex items-center px-[18px] cursor-pointer  text-white rounded-[10px] gap-x-2.5 ${
        isActive ? "bg-[#02816E]" : ""
      }`}
    >
      {icon}

      <span className="font-normal text-base mx-auto ">{title}</span>
    </div>
  );
};

export default SideMenuItem;
// bg-[#02816E]
