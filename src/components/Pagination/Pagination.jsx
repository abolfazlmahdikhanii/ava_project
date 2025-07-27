<<<<<<< HEAD

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
=======
import React, { Fragment, useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import { Link } from "react-router-dom";
import { getUrlParam } from "../../helper/helper";

const Pagination = ({
  count,
  prevUrl,
  nextUrl,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(1);
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    const total = Math.ceil(count / 10);
    setTotalPages(total);
  }, [count, currentPage]);
  const getPageNumbers = () => {
    const pages = [];
    let maxVisiblePages = Math.ceil(totalPages / 2);
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };
  const nextPageHandler = () => {
    if (nextUrl) {
      const nextPage = getUrlParam(nextUrl, "page");
      setActivePage(nextPage > 1 ? parseInt(nextPage) : 1);
      onPageChange(nextPage);
    }
  };
  const prevPageHandler = () => {
    if (prevUrl) {
      const prevPage = getUrlParam(prevUrl, "page");
      setActivePage(prevPage > 1 ? parseInt(prevPage) : 1);
      onPageChange(prevPage);
    }
  };
  console.log(activePage);
  return (
    <div className="bg-white px-6 py-4">
      <div className="flex items-center justify-center gap-2 font-light">
        <button
          className="text-gray-700 h-8 w-8 p-0 grid place-items-center cursor-pointer disabled:text-gray-400 disabled:cursor-default"
          disabled={!prevUrl}
          onClick={prevPageHandler}
        >
          <Icon
            name="arrow-right"
            width={6}
            height={10}
            className="text-current"
          />
        </button>

        {getPageNumbers().map((page) => (
          <Fragment key={page}>
            {page === "..." ? (
              <span className="text-sm text-gray-600">...</span>
            ) : (
              <button
                className={`cursor-pointer h-8 min-w-[32px] text-sm rounded-full hover:bg-teal-600/60 hover:text-white ${
                  activePage === page
                    ? "bg-teal-500 hover:bg-teal-600 text-white  "
                    : " text-gray-700 px-2"
                }`}
                onClick={() => {
                  setActivePage(page);
                  onPageChange(page !== 1 ? page.toString() : "");
                }}
              >
                {page.toLocaleString("fa")}
              </button>
            )}
          </Fragment>
        ))}

        <button
          className="text-gray-600 h-8 w-8 p-0 grid place-items-center cursor-pointer disabled:text-gray-400 disabled:cursor-default"
          disabled={!nextUrl}
          onClick={nextPageHandler}
        >
          <Icon
            name="arrow-left"
            width={6}
            height={10}
            className="text-current"
          />
>>>>>>> 0604e09 (Add solution for challenge 3)
        </button>
      </div>
    </div>
  );
};

export default Pagination;
