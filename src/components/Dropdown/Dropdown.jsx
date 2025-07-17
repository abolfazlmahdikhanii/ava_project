import React, { useEffect, useState } from "react";
import Icon from "../Icon/Icon";

const Dropdown = ({
  title,
  children,
  items = [],
  type,
  size = "pl-4 pr-5",
}) => {
  const [isShow, setIsShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (type === "select" && !selectedItem && items.length > 0) {
      setSelectedItem(items[0]);
    }
  }, [type, selectedItem, items]);

  const toggleDropdown = () => setIsShow((prev) => !prev);
  
  const handleItemClick = (item) => {
    if (type === "select") setSelectedItem(item);
    setIsShow(false);
  };

  // Mouse leave handler - only close if type is not "select"
  const handleMouseLeave = () => {
    if (type !== "select") {
      setIsShow(false);
    }
  };

  return (
    <div
      className={`relative border border-[#00BA9F] h-[38px] select-none text-[14px] grow-0 ${
        isShow ? "rounded-t-[20px] border-b-0" : "rounded-[20px]"
      } ${size}`}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex items-center h-full gap-x-3.5 cursor-pointer relative pr-[14px]"
        onClick={toggleDropdown}
      >
        {type === "select" ? (
          <div
            className="flex items-center gap-x-[6px] text-[#00BA9F]"
            data-val={selectedItem?.value}
          >
            <p>{children}</p>
            <p className="text-sm font-light">{selectedItem?.text}</p>
          </div>
        ) : (
          <div className="flex items-center gap-x-[6px] text-[#00BA9F]">
            {children}
            <p>{title}</p>
          </div>
        )}
        <Icon
          width={7}
          height={5}
          name="arrow-down"
          className={`text-[#00BA9F] mt-0.5 absolute left-4 transition-transform ${
            isShow ? "rotate-180" : ""
          }`}
        />
      </div>

      {isShow && (
        <div className="absolute w-[101%] left-[-0.5px] border border-t-0 border-[#00BA9F] pl-4 pr-4 rounded-b-[20px] bg-white z-10">
          {items.map((item, index) => {
            const shouldShowItem =
              type === "select"
                ? selectedItem
                  ? item.id !== selectedItem.id
                  : index !== 0
                : true;

            return (
              shouldShowItem && (
                <div
                  key={item.id}
                  className="border-t border-[#00BA9F] w-full text-[#00BA9F] py-[11px] flex items-center gap-x-[10px] cursor-pointer transition-colors"
                  onClick={() => handleItemClick(item)}
                >
                  {item.icon}
                  <p className="text-sm font-light">{item.text}</p>
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;