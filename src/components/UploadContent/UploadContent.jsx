import React, { useState, useRef, useEffect } from "react";
import Icon from "../Icon/Icon";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import {
  copyTextHandler,
  formatDuration,
  formatTime,
  timeToSeconds,
  toastOption,
} from "../../helper/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUploading,
  setActiveAudioTime,
  setActiveContent,
  setPlayerColor,
} from "../../Redux/store/Transcribe";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const UploadContent = ({ type }) => {
  const { currentUpload, selectedArchive, activeContent, activeTime } =
    useSelector((state) => state.transcribe);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("simple-text");
  const {
    segments: contents,
    url,
    filename,
  } = type === "archive" ? selectedArchive : currentUpload;

  const checkIsActiveContent = (start, end) => {
    return (
      activeContent >= timeToSeconds(start) &&
      activeContent < timeToSeconds(end)
    );
  };
  function downloadText(text, filename) {
    if (!text?.some((item) => item.text?.trim() !== "")) {
      toast.error("متن قابل کپی وجود ندارد", toastOption);
      return;
    }
    const txt = text.map((item) => item.text).join(" ");

    // Create a Blob with the text
    const blob = new Blob([txt], { type: "text/plain" });

    // Create  link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename||"download_text" + ".txt";

    //  download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className=" bg-white flex-col justify-between flex h-full">
      {/* Header */}
      <div
        className={`flex justify-between items-center px-2 border-b border-gray-200 pt-4  ${
          type !== "archive" ? "w-full  pb-3" : "w-fit  pb-4.5"
        }`}
      >
        <div className="flex items-center gap-8 ">
          <span
            className={`  inline-flex gap-x-2 items-center text-sm relative cursor-pointer    ${
              activeTab === "simple-text"
                ? "active-tab text-black"
                : "font-light text-gray-500"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab("simple-text");
            }}
          >
            <Icon
              width={17}
              height={17}
              name="simple-text"
              className="text-current"
              color="none"
            />
            متن ساده
          </span>
          <span
            className={`  inline-flex gap-x-2 items-center text-sm relative cursor-pointer  ${
              activeTab === "time-text"
                ? "active-tab text-black"
                : "font-light text-gray-500"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab("time-text");
            }}
          >
            <Icon
              width={17}
              height={17}
              name="time-text"
              className="text-current"
              color="none"
            />
            متن زمان‌بندی شده
          </span>
        </div>
        {type !== "archive" && (
          <div className="flex items-center gap-5">
            <button
              className="text-[#8F8F8F] cursor-pointer"
              onClick={() => downloadText(contents, filename)}
            >
              <Icon
                width={14}
                height={15}
                name="download"
                className="text-current"
                color="none"
              />
            </button>
            <button
              className="text-[#8F8F8F] cursor-pointer"
              onClick={() => copyTextHandler(contents)}
            >
              <Icon
                width={16}
                height={18}
                name="copy"
                className="text-current"
                color="none"
              />
            </button>
            <button
              className="bg-[#118AD3] hover:bg-blue-600 text-white w-[112px] h-[34px] rounded-[20px] text-sm flex items-center gap-1.5 justify-center cursor-pointer font-light"
              onClick={() => dispatch(resetUploading())}
            >
              <Icon
                width={12}
                height={13}
                name="refresh"
                className="text-current"
                color="none"
              />
              شروع دوباره
            </button>
          </div>
        )}
      </div>

      {/* Transcript/Timeline */}
      <div
        className={`bg-white h-[280px] mt-2 pt-1 pb-2 custom-scrollbar overflow-y-auto pl-3 `}
      >
        {activeTab === "time-text" && (
          <>
            {contents?.map((item, index) => (
              <div
                key={index}
                className={`flex items-center  h-[62px] px-5 p rounded-[20px] cursor-pointer select-none  ${
                  index % 2 == 0 ? "bg-[#F2F2F2]" : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => dispatch(setActiveAudioTime(item.start))}
              >
                <div
                  className={`flex items-center gap-4 font-light   pr-4 ${
                    checkIsActiveContent(item.start, item.end)
                      ? "text-[#118AD3] "
                      : "text-[rgba(0,0,0,.8)]"
                  }`}
                >
                  <span className="font-num">{item.start}</span>
                  <span className="font-num">{item.end}</span>
                </div>
                <div className="mr-6 w-full overflow-hidden">
                  <span
                    className={`font-light line-clamp-1 leading-[1.8] ${
                      checkIsActiveContent(item.start, item.end)
                        ? "text-[#118AD3] "
                        : "text-[rgba(0,0,0,.8)]"
                    }`}
                  >
                    [{item.text.length ? item.text : "---"}]
                  </span>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === "simple-text" && (
          <p className="font-light leading-[1.8] py-3">
            {contents?.map((item, index) => {
              const isActive = checkIsActiveContent(item.start, item.end);

              return (
                <span
                  key={index}
                  className={isActive ? "text-[#00ba9f] font-normal" : ""}
                >
                  {item.text ? item.text : `[---]`}{" "}
                </span>
              );
            })}
          </p>
        )}
      </div>

      {/* Audio Player Controls */}
      <AudioPlayer />
    </div>
  );
};

export default UploadContent;
