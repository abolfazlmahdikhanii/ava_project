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

const ArchiveItem = ({
  id,
  fileType,
  filename,
  uploadDate,
  uploadType,
  duration,
  size,
  isOpen,
  setIsOpen,
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

  const isCurrentlyOpen = isOpen === id;

  return (
    <div
      className={`transition-all duration-200 border  ${
        isCurrentlyOpen
          ? `rounded-[10px] pt-3 pb-5 mb-2 `
          : "border-transparent"
      }`}
      style={isCurrentlyOpen ? { borderColor: getUploadTypeColor(url) } : null}
    >
      <div className={`archive-item `} onClick={handleToggle}>
        {/* FileType */}
        <div className="w-fit flex justify-center col-span-1 cursor-pointer">
          <UploadType type={checkMediaType(url)} />
        </div>
        {/* File Name */}
        <div className="col-span-5">
          <div
            className={`font-light truncate text-right ${
              checkIsLink(url) && isValidURL(url)
                ? "text-[#118AD3]"
                : "text-black"
            } `}
            dir={checkIsLink(url) && isValidURL(url) ? "ltr" : "auto"}
          >
            {checkIsLink(url) ? url : filename}
          </div>
        </div>

        {/* Upload Date */}
        <div className="col-span-2 text-center">
          <span className="text-xs font-light">{getDate(processed)}</span>
        </div>

        {/* File Type */}
        <div className="col-span-1 text-center">
          <span className="text-xs font-light">{getFileExtension(url)}</span>
        </div>

        {/* Duration */}
        <div className="col-span-1 text-center">
          <span className="text-xs font-num font-light text-gray-600">
            {formatDuration(duration)}
          </span>
        </div>

        {/* Action Buttons - LEFT SIDE */}
        <div className="col-span-2 flex justify-start gap-1.5 ">
          <div
            className="archive-item__btn relative group archive-item__btn-primary "
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              downloadFile(url, filename);
            }}
          >
            <Icon
              width={14}
              height={15}
              name="download"
              className="text-current"
            />

            <p className="tooltip font-num">{size || "نامشخص"}</p>
          </div>
          <button
            className="archive-item__btn archive-item__btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              copyToWordHandler();
            }}
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
            onClick={(e) => {
              e.stopPropagation();
              copyTextHandler();
            }}
          >
            <Icon width={15} height={15} name="copy" className="text-current" />
          </button>
          <button
            className="archive-item__btn rounded-full archive-item__btn-remove hover:bg-red-600 "
            onClick={(e) => {
              e.stopPropagation();
              onDelete({ id, name: filename });
            }}
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
        <div className="w-[89%] mx-auto pr-7">
          <UploadContent
            type="archive"
            playerColor={getUploadTypeColor(url)}
            contents={segments}
            url={url}
            duration={duration}
          />
        </div>
      )}
    </div>
  );
};

export default ArchiveItem;
