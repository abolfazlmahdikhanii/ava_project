<<<<<<< HEAD
import React, { useState } from "react";
import UploadContent from "../../components/UploadContent/UploadContent";
import Icon from "../Icon/Icon";
import UploadType from "../UploadType/UploadType";
=======
import React, { useEffect, useState } from "react";
import UploadContent from "../../components/UploadContent/UploadContent";
import Icon from "../Icon/Icon";
import UploadType from "../UploadType/UploadType";
import ufs from "url-file-size";
import {
  checkMediaType,
  formatDuration,
  getDate,
  getFileExtension,
  isValidURL,
  toastOption,
} from "../../helper/helper";
import toast from "react-hot-toast";
>>>>>>> 0604e09 (Add solution for challenge 3)

const ArchiveItem = ({
  id,
  fileType,
<<<<<<< HEAD
  name,
=======
  filename,
>>>>>>> 0604e09 (Add solution for challenge 3)
  uploadDate,
  uploadType,
  duration,
  size,
  isOpen,
  setIsOpen,
<<<<<<< HEAD
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
=======
  processed,
  url,
  segments,
  onDelete,
  onCopy,
  onCopyWord,
  onDownloadAudio,
}) => {
  const [fileSize, setFileSize] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.HEADERS_RECEIVED) {
        const size = xhr.getResponseHeader("Content-Length");
        if (size) {
          setFileSize(parseInt(size));
          // setFileSizeFormatted(formatFileSize(size));
        }
      }
    };
    xhr.send();
  }, [url]);
  const handleToggle = () => {
    if (segments.some((item) => item.text !== "")) {
      if (isOpen === id) {
        setIsOpen(null);
      } else {
        setIsOpen(id);
      }
    }
  };

  
  const downloadFile = async (url, fileName) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName || "downloaded_file"; // Use provided name or default
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("دانلود با موفقیت انجام شد", toastOption);
      })
      .catch((error) => {
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.target = "_blank";

        a.click();
      });
  };
  const getUploadTypeColor = (url) => {
    const type = checkMediaType(url);

>>>>>>> 0604e09 (Add solution for challenge 3)
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
<<<<<<< HEAD
=======
  const checkIsLink = (txt) => {
    const excludedUrls = ["harf.roshan-ai.ir/media", "tmpfiles.org/dl"];

    return !excludedUrls.some((url) => txt.includes(url));
  };

  async function getFileSizeFromUrl(url) {
    try {
      const fileSize = await ufs(url);
      console.log(fileSize);
      return fileSize;
    } catch (err) {
      setError(err.message || "Failed to get file size");
    }
  }
  const copyTextHandler = () => {
    const txt = segments?.map((item) => item.text).join(" ");

    if (!segments?.some((item) => item.text !== "")) {
      return;
    }
    navigator.clipboard
      .writeText(txt)
      .then((res) => {
        toast.success("متن با موفقیت کپی شد", toastOption);
      })
      .catch((err) => {
        toast.error("کپی کردن متن با مشکل مواجه شد", toastOption);
      });
  };
  const copyToWordHandler = () => {
    const texts = segments?.map((item) => item.text).join(" ");

    if (!segments?.some((item) => item.text !== "") && !texts.trim()) {
      return;
    }

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8' />
          <title>Document</title>
          <style>
            body {
              direction:rtl;
              text-align: right;
              font-family:"Tahoma",sans-serif;
              line-height:1.8
            }
          </style>
        </head>
        <body>
          ${texts.replace(/\n/g, "</p><p>")}
        </body>
      </html>
    `;

    const blob = new Blob([content], {
      type: "application/msword",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Usage

>>>>>>> 0604e09 (Add solution for challenge 3)
  const isCurrentlyOpen = isOpen === id;

  return (
    <div
      className={`transition-all duration-200 border  ${
        isCurrentlyOpen
<<<<<<< HEAD
          ? `rounded-[10px] pt-3 pb-5 mb-2 border-[${getUploadTypeColor(
              uploadType
            )}]`
          : "border-transparent"
      }`}
=======
          ? `rounded-[10px] pt-3 pb-5 mb-2 `
          : "border-transparent"
      }`}
      style={isCurrentlyOpen ? { borderColor: getUploadTypeColor(url) } : null}
>>>>>>> 0604e09 (Add solution for challenge 3)
    >
      <div className={`archive-item `} onClick={handleToggle}>
        {/* FileType */}
        <div className="w-fit flex justify-center col-span-1 cursor-pointer">
<<<<<<< HEAD
          <UploadType type={uploadType} />
=======
          <UploadType type={checkMediaType(url)} />
>>>>>>> 0604e09 (Add solution for challenge 3)
        </div>
        {/* File Name */}
        <div className="col-span-5">
          <div
<<<<<<< HEAD
            className={`font-light truncate ${
              isValidURL(name) ? "text-[#118AD3]" : "text-black"
            } `}
            title={name}
            dir={isValidURL(name) ? "ltr" : "rtl"}
          >
            {name}
=======
            className={`font-light truncate text-right ${
              checkIsLink(url) && isValidURL(url)
                ? "text-[#118AD3]"
                : "text-black"
            } `}
            dir={checkIsLink(url) && isValidURL(url) ? "ltr" : "auto"}
          >
            {checkIsLink(url) ? url : filename}
>>>>>>> 0604e09 (Add solution for challenge 3)
          </div>
        </div>

        {/* Upload Date */}
<<<<<<< HEAD
        <div className="col-span-1 text-center">
          <span className="text-xs font-light">{uploadDate}</span>
=======
        <div className="col-span-2 text-center">
          <span className="text-xs font-light">{getDate(processed)}</span>
>>>>>>> 0604e09 (Add solution for challenge 3)
        </div>

        {/* File Type */}
        <div className="col-span-1 text-center">
<<<<<<< HEAD
          <span className="text-xs font-light">{fileType}</span>
=======
          <span className="text-xs font-light">{getFileExtension(url)}</span>
>>>>>>> 0604e09 (Add solution for challenge 3)
        </div>

        {/* Duration */}
        <div className="col-span-1 text-center">
          <span className="text-xs font-num font-light text-gray-600">
<<<<<<< HEAD
            {duration}
=======
            {formatDuration(duration)}
>>>>>>> 0604e09 (Add solution for challenge 3)
          </span>
        </div>

        {/* Action Buttons - LEFT SIDE */}
        <div className="col-span-2 flex justify-start gap-1.5 ">
          <div
            className="archive-item__btn relative group archive-item__btn-primary "
<<<<<<< HEAD
            onClick={(e) => e.stopPropagation()}
=======
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              downloadFile(url, filename);
            }}
>>>>>>> 0604e09 (Add solution for challenge 3)
          >
            <Icon
              width={14}
              height={15}
              name="download"
              className="text-current"
            />

<<<<<<< HEAD
            <p className="tooltip font-num">3.18 مگابایت</p>
          </div>
          <button
            className="archive-item__btn archive-item__btn-primary"
            onClick={(e) => e.stopPropagation()}
=======
            <p className="tooltip font-num">{size || "نامشخص"}</p>
          </div>
          <button
            className="archive-item__btn archive-item__btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              copyToWordHandler();
            }}
>>>>>>> 0604e09 (Add solution for challenge 3)
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
<<<<<<< HEAD
            onClick={(e) => e.stopPropagation()}
=======
            onClick={(e) => {
              e.stopPropagation();
              copyTextHandler();
            }}
>>>>>>> 0604e09 (Add solution for challenge 3)
          >
            <Icon width={15} height={15} name="copy" className="text-current" />
          </button>
          <button
            className="archive-item__btn rounded-full archive-item__btn-remove hover:bg-red-600 "
<<<<<<< HEAD
            onClick={(e) => e.stopPropagation()}
=======
            onClick={(e) => {
              e.stopPropagation();
              onDelete({ id, name: filename });
            }}
>>>>>>> 0604e09 (Add solution for challenge 3)
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
<<<<<<< HEAD
        <div className="w-[87%] mx-auto pr-7">
          <UploadContent
            type="archive"
            playerColor={getUploadTypeColor(uploadType)}
=======
        <div className="w-[89%] mx-auto pr-7">
          <UploadContent
            type="archive"
            playerColor={getUploadTypeColor(url)}
            contents={segments}
            url={url}
            duration={duration}
>>>>>>> 0604e09 (Add solution for challenge 3)
          />
        </div>
      )}
    </div>
  );
};

export default ArchiveItem;
