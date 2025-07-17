import React, { useState } from "react";
import UploadContent from "../../components/UploadContent/UploadContent";
import Icon from "../Icon/Icon";
import UploadType from "../UploadType/UploadType";

const ArchiveItem = ({
  id,
  fileType,
  name,
  uploadDate,
  uploadType,
  duration,
  size,
  isOpen,
  setIsOpen,
}) => {
  const handleToggle = () => {
    if (isOpen === id) {
      setIsOpen(null);
    } else {
      setIsOpen(id);
    }
  };

  function isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
  const getUploadTypeColor = (type) => {
    switch (type) {
      case "link":
        return "#FF1654";
      case "record":
        return "#40C6B8";
      case "upload":
        return "#118AD3";
      default:
        return "#118AD3";
    }
  };
  const isCurrentlyOpen = isOpen === id;

  return (
    <div
      className={`transition-all duration-200 border  ${
        isCurrentlyOpen
          ? `rounded-[10px] pt-3 pb-5 mb-2 border-[${getUploadTypeColor(
              uploadType
            )}]`
          : "border-transparent"
      }`}
    >
      <div className={`archive-item `} onClick={handleToggle}>
        {/* FileType */}
        <div className="w-fit flex justify-center col-span-1 cursor-pointer">
          <UploadType type={uploadType} />
        </div>
        {/* File Name */}
        <div className="col-span-5">
          <div
            className={`font-light truncate ${
              isValidURL(name) ? "text-[#118AD3]" : "text-black"
            } `}
            title={name}
            dir={isValidURL(name) ? "ltr" : "rtl"}
          >
            {name}
          </div>
        </div>

        {/* Upload Date */}
        <div className="col-span-1 text-center">
          <span className="text-xs font-light">{uploadDate}</span>
        </div>

        {/* File Type */}
        <div className="col-span-1 text-center">
          <span className="text-xs font-light">{fileType}</span>
        </div>

        {/* Duration */}
        <div className="col-span-1 text-center">
          <span className="text-xs font-num font-light text-gray-600">
            {duration}
          </span>
        </div>

        {/* Action Buttons - LEFT SIDE */}
        <div className="col-span-2 flex justify-start gap-1.5 ">
          <div
            className="archive-item__btn relative group archive-item__btn-primary "
            onClick={(e) => e.stopPropagation()}
          >
            <Icon
              width={14}
              height={15}
              name="download"
              className="text-current"
            />

            <p className="tooltip font-num">3.18 مگابایت</p>
          </div>
          <button
            className="archive-item__btn archive-item__btn-primary"
            onClick={(e) => e.stopPropagation()}
          >
            <Icon
              width={13}
              height={17}
              name="word-file"
              className="text-current"
            />
          </button>
          <button
            className="archive-item__btn  archive-item__btn-primary"
            onClick={(e) => e.stopPropagation()}
          >
            <Icon width={15} height={15} name="copy" className="text-current" />
          </button>
          <button
            className="archive-item__btn rounded-full archive-item__btn-remove hover:bg-red-600 "
            onClick={(e) => e.stopPropagation()}
          >
            <Icon
              width={11}
              height={16}
              name="remove"
              className="stroke-current"
              color="none"
            />
          </button>
        </div>
      </div>
      {isCurrentlyOpen && (
        <div className="w-[87%] mx-auto pr-7">
          <UploadContent
            type="archive"
            playerColor={getUploadTypeColor(uploadType)}
          />
        </div>
      )}
    </div>
  );
};

export default ArchiveItem;
