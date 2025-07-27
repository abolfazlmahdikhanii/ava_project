<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from "react";
import UploadContent from "../../components/UploadContent/UploadContent";
import Icon from "../Icon/Icon";
import UploadType from "../UploadType/UploadType";
=======
=======
>>>>>>> 574ed32 (Add solution for challenge 4)
import React, { useEffect, useState } from "react";
import UploadContent from "../../components/UploadContent/UploadContent";
import Icon from "../Icon/Icon";
import UploadType from "../UploadType/UploadType";
<<<<<<< HEAD
import ufs from "url-file-size";
import {
  checkMediaType,
  formatDuration,
=======

import {
  checkMediaType,
  copyTextHandler,
  formatDuration,
  formatFileSize,
>>>>>>> 574ed32 (Add solution for challenge 4)
  getDate,
  getFileExtension,
  isValidURL,
  toastOption,
} from "../../helper/helper";
import toast from "react-hot-toast";
<<<<<<< HEAD
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
=======
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveAudioTime,
  setActiveContent,
  setPlayerColor,
  setRemoveContent,
  setSelectItem,
} from "../../Redux/store/Transcribe";

const ArchiveItem = ({ id, filename, duration, processed, url, segments }) => {
  const { selectedArchive } = useSelector((state) => state.transcribe);
  const dispatch = useDispatch();
  const [fileSize, setFileSize] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    getFileSizeFromUrl(url);
  }, [url]);
  async function getFileSizeFromUrl(url) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      const contentLength = response.headers.get("Content-Length");

      if (contentLength) {
        setFileSize(contentLength);
        // };
      } else {
        throw new Error("Content-Length header not found");
      }
    } catch (error) {
      console.log(`Failed to get file size from URL: ${error.message}`);
    }
  }
  const handleToggle = () => {
    if (segments.some((item) => item.text !== "")) {
      if (selectedArchive && selectedArchive.id === id) {
        dispatch(setSelectItem(null));
      } else {
        dispatch(setSelectItem({ id, url, duration, segments }));
        const color = getUploadTypeColor(url);

        dispatch(setPlayerColor(color));
      }
      dispatch(setActiveContent(null));
      dispatch(setActiveAudioTime(null));
    }
  };

  const getUploadTypeColor = (url) => {
    const type = checkMediaType(url);

>>>>>>> 574ed32 (Add solution for challenge 4)
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
<<<<<<< HEAD
=======
=======
>>>>>>> 574ed32 (Add solution for challenge 4)
  const checkIsLink = (txt) => {
    const excludedUrls = ["harf.roshan-ai.ir/media", "tmpfiles.org/dl"];

    return !excludedUrls.some((url) => txt.includes(url));
  };

<<<<<<< HEAD
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
=======
>>>>>>> 574ed32 (Add solution for challenge 4)
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
<<<<<<< HEAD
  // Usage

>>>>>>> 0604e09 (Add solution for challenge 3)
  const isCurrentlyOpen = isOpen === id;
=======
  const downloadFile = async (url, fileName) => {
    try {
      setIsDownloading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = fileName || "downloaded_file";
      document.body.appendChild(a);
      a.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
      }, 100);
      setIsDownloading(false);
      toast.success("دانلود با موفقیت انجام شد", toastOption);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback method
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "downloaded_file";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      setIsDownloading(false);
      setTimeout(() => {
        document.body.removeChild(a);
      }, 100);
    }
  };
  // Usage

  const isCurrentlyOpen = selectedArchive?.id === id;
>>>>>>> 574ed32 (Add solution for challenge 4)

  return (
    <div
      className={`transition-all duration-200 border  ${
        isCurrentlyOpen
<<<<<<< HEAD
<<<<<<< HEAD
          ? `rounded-[10px] pt-3 pb-5 mb-2 border-[${getUploadTypeColor(
              uploadType
            )}]`
          : "border-transparent"
      }`}
=======
=======
>>>>>>> 574ed32 (Add solution for challenge 4)
          ? `rounded-[10px] pt-3 pb-5 mb-2 `
          : "border-transparent"
      }`}
      style={isCurrentlyOpen ? { borderColor: getUploadTypeColor(url) } : null}
<<<<<<< HEAD
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
=======
    >
      <div className={`archive-item select-none `} onClick={handleToggle}>
        {/* FileType */}
        <div className="w-fit flex justify-center col-span-1 cursor-pointer">
          <UploadType type={checkMediaType(url)} />
>>>>>>> 574ed32 (Add solution for challenge 4)
        </div>
        {/* File Name */}
        <div className="col-span-5">
          <div
<<<<<<< HEAD
<<<<<<< HEAD
            className={`font-light truncate ${
              isValidURL(name) ? "text-[#118AD3]" : "text-black"
            } `}
            title={name}
            dir={isValidURL(name) ? "ltr" : "rtl"}
          >
            {name}
=======
=======
>>>>>>> 574ed32 (Add solution for challenge 4)
            className={`font-light truncate text-right ${
              checkIsLink(url) && isValidURL(url)
                ? "text-[#118AD3]"
                : "text-black"
            } `}
            dir={checkIsLink(url) && isValidURL(url) ? "ltr" : "auto"}
          >
            {checkIsLink(url) ? url : filename}
<<<<<<< HEAD
>>>>>>> 0604e09 (Add solution for challenge 3)
=======
>>>>>>> 574ed32 (Add solution for challenge 4)
          </div>
        </div>

        {/* Upload Date */}
<<<<<<< HEAD
<<<<<<< HEAD
        <div className="col-span-1 text-center">
          <span className="text-xs font-light">{uploadDate}</span>
=======
        <div className="col-span-2 text-center">
          <span className="text-xs font-light">{getDate(processed)}</span>
>>>>>>> 0604e09 (Add solution for challenge 3)
=======
        <div className="col-span-2 text-center">
          <span className="text-xs font-light">{getDate(processed)}</span>
>>>>>>> 574ed32 (Add solution for challenge 4)
        </div>

        {/* File Type */}
        <div className="col-span-1 text-center">
<<<<<<< HEAD
<<<<<<< HEAD
          <span className="text-xs font-light">{fileType}</span>
=======
          <span className="text-xs font-light">{getFileExtension(url)}</span>
>>>>>>> 0604e09 (Add solution for challenge 3)
=======
          <span className="text-xs font-light">{getFileExtension(url)}</span>
>>>>>>> 574ed32 (Add solution for challenge 4)
        </div>

        {/* Duration */}
        <div className="col-span-1 text-center">
          <span className="text-xs font-num font-light text-gray-600">
<<<<<<< HEAD
<<<<<<< HEAD
            {duration}
=======
            {formatDuration(duration)}
>>>>>>> 0604e09 (Add solution for challenge 3)
=======
            {formatDuration(duration)}
>>>>>>> 574ed32 (Add solution for challenge 4)
          </span>
        </div>

        {/* Action Buttons - LEFT SIDE */}
        <div className="col-span-2 flex justify-start gap-1.5 ">
<<<<<<< HEAD
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
=======
          <button
            className="archive-item__btn relative group archive-item__btn-primary "
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              !isDownloading ? downloadFile(url, filename) : null;
            }}
            disabled={isDownloading ? true : false}
          >
            {!isDownloading ? (
              <>
                <Icon
                  width={14}
                  height={15}
                  name="download"
                  className="text-current"
                />

                <p className="tooltip font-num">
                  {fileSize ? formatFileSize(fileSize) : "نامشخص"}
                </p>
              </>
            ) : (
              <div className="w-4 h-4 border-2 select-none border-t-[var(--primary)] border-gray-300 rounded-full animate-spin cursor-not-allowed"></div>
            )}
          </button>
>>>>>>> 574ed32 (Add solution for challenge 4)
          <button
            className="archive-item__btn archive-item__btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              copyToWordHandler();
            }}
<<<<<<< HEAD
>>>>>>> 0604e09 (Add solution for challenge 3)
=======
>>>>>>> 574ed32 (Add solution for challenge 4)
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
<<<<<<< HEAD
            onClick={(e) => e.stopPropagation()}
=======
            onClick={(e) => {
              e.stopPropagation();
              copyTextHandler();
            }}
>>>>>>> 0604e09 (Add solution for challenge 3)
=======
            onClick={(e) => {
              e.stopPropagation();
              copyTextHandler(segments);
            }}
>>>>>>> 574ed32 (Add solution for challenge 4)
          >
            <Icon width={15} height={15} name="copy" className="text-current" />
          </button>
          <button
            className="archive-item__btn rounded-full archive-item__btn-remove hover:bg-red-600 "
<<<<<<< HEAD
<<<<<<< HEAD
            onClick={(e) => e.stopPropagation()}
=======
            onClick={(e) => {
              e.stopPropagation();
              onDelete({ id, name: filename });
            }}
>>>>>>> 0604e09 (Add solution for challenge 3)
=======
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setRemoveContent({ id, name: filename }));
            }}
>>>>>>> 574ed32 (Add solution for challenge 4)
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
=======
        <div className="w-[89%] mx-auto pr-7">
          <UploadContent type="archive" />
>>>>>>> 574ed32 (Add solution for challenge 4)
        </div>
      )}
    </div>
  );
};

export default ArchiveItem;
