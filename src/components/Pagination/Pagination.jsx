
import React from "react";
import Icon from "../Icon/Icon";

const Pagination = () => {
  return (
    <div className="bg-white px-6 py-4">
      <div className="flex items-center justify-center gap-2 font-light">
        <button className="text-gray-600 h-8 w-8 p-0">
        <Icon name="arrow-right" width={6} height={10}  className="text-gray-500" />
        </button>
        <span className="text-sm text-gray-600 px-2">۳۵۴</span>
        <span className="text-sm text-gray-600">...</span>
        <span className="text-sm text-gray-600 px-2">۱۴۳</span>
        <span className="text-sm text-gray-600 px-2">۱۲۵</span>
        <button className="bg-teal-500 hover:bg-teal-600 text-white h-8 min-w-[32px] text-sm rounded-full">
          ۱۲۴
        </button>
        <span className="text-sm text-gray-600 px-2">۱۲۳</span>
        <span className="text-sm text-gray-600">...</span>
        <span className="text-sm text-gray-600 px-2">۱</span>
        <button className="text-gray-600 h-8 w-8 p-0">
             <Icon name="arrow-left" width={6} height={10}  className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
