import React, { useState, useRef } from "react";
import Icon from "../Icon/Icon";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { formatDuration, formatTime } from "../../helper/helper";

const UploadContent = ({
  type,
  playerColor,
  contents,
  url,
  duration,
  onRetry,
}) => {
  const [activeTab, setActiveTab] = useState("simple-text");
  const [activeCurrentContent, setActiveCurrentContent] = useState(0);

  const checkActivityContent = (time) => {
    setActiveCurrentContent(time);
  };
  const timeToSeconds = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };
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
            <button className="text-[#8F8F8F] cursor-pointer">
              <Icon
                width={14}
                height={15}
                name="download"
                className="text-current"
                color="none"
              />
            </button>
            <button className="text-[#8F8F8F] cursor-pointer">
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
              onClick={onRetry}
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
      <div className="bg-gray-50 h-[280px] mt-2 pt-1 pb-2 custom-scrollbar overflow-y-auto pl-3 ">
        {activeTab === "time-text" && (
          <>
            {contents?.map((item, index) => (
              <div
                key={index}
                className={`flex items-center  h-[62px] px-5 p rounded-[20px] cursor-pointer  ${
                  index % 2 == 0 ? "bg-[#F2F2F2]" : "bg-white hover:bg-gray-50"
                }`}
              >
                <div
                  className={`flex items-center gap-4 font-light   pr-4 ${
                    activeCurrentContent >= timeToSeconds(item.start) &&
                    activeCurrentContent < timeToSeconds(item.end)
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
                      activeCurrentContent >= timeToSeconds(item.start) &&
                      activeCurrentContent < timeToSeconds(item.end)
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
              const isActive =
                activeCurrentContent >= timeToSeconds(item.start) &&
                activeCurrentContent < timeToSeconds(item.end);

              return (
                <span
                  key={index}
                  className={isActive ? "text-[#00ba9f] font-normal" : ""}
                >
                  {item.text?item.text:`[---]`}{" "}
                </span>
              );
            })}
          </p>
        )}
      </div>

      {/* Audio Player Controls */}
      <AudioPlayer
        playerColor={playerColor}
        audioUrl={url}
        durationAudio={duration}
        onActive={checkActivityContent}
      />
    </div>
  );
};

export default UploadContent;
