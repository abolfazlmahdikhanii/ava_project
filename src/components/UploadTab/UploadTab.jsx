import React from "react";

const UploadTab = ({ children, title, value, onActive, activeTab }) => {
  return (
    <div
      className={`h-[48px] ${
        value === activeTab
          ? `${value}--active-tab text-white `
          : "text-sm text-[#969696] "
      }   rounded-tr-[10px] rounded-tl-[10px] flex items-center gap-x-[7px] justify-center cursor-pointer  `}
      onClick={() => onActive(value)}
    >
      {children}
      <p className="whitespace-nowrap">{title}</p>
    </div>
  );
};

export default UploadTab;
