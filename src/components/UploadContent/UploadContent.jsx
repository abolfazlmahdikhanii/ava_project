import React, { useState, useRef } from "react";
import Icon from "../Icon/Icon";
<<<<<<< HEAD

const UploadContent = ({ type, playerColor }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(162); // 2:42 in seconds
  const [duration] = useState(480); // 8:00 in seconds
  const [volume, setVolume] = useState(0.7);
  const [activeTab, setActiveTab] = useState("simple-text");
  const progressRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePlayPause = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    setCurrentTime(Math.floor(newTime));
  };

  const transcriptItems = [
    { time: "00:08", endTime: "00:12", text: "برای", isActive: false },
    { time: "00:12", endTime: "00:16", text: "برای", isActive: false },
    { time: "00:16", endTime: "00:18", text: "برای", isActive: false },
    { time: "00:18", endTime: "00:12", text: "برای", isActive: true },
    { time: "00:12", endTime: "00:16", text: "برای", isActive: false },
  ];

=======
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
>>>>>>> 0604e09 (Add solution for challenge 3)
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
<<<<<<< HEAD
              activeTab === "simple-text" ? "active-tab text-black" : "font-light text-gray-500"
=======
              activeTab === "simple-text"
                ? "active-tab text-black"
                : "font-light text-gray-500"
>>>>>>> 0604e09 (Add solution for challenge 3)
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
<<<<<<< HEAD
              activeTab === "time-text" ? "active-tab text-black" : "font-light text-gray-500"
=======
              activeTab === "time-text"
                ? "active-tab text-black"
                : "font-light text-gray-500"
>>>>>>> 0604e09 (Add solution for challenge 3)
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
<<<<<<< HEAD
            <button className="bg-[#118AD3] hover:bg-blue-600 text-white w-[112px] h-[34px] rounded-[20px] text-sm flex items-center gap-1.5 justify-center cursor-pointer font-light">
=======
            <button
              className="bg-[#118AD3] hover:bg-blue-600 text-white w-[112px] h-[34px] rounded-[20px] text-sm flex items-center gap-1.5 justify-center cursor-pointer font-light"
              onClick={onRetry}
            >
>>>>>>> 0604e09 (Add solution for challenge 3)
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
<<<<<<< HEAD
            {transcriptItems.map((item, index) => (
=======
            {contents?.map((item, index) => (
>>>>>>> 0604e09 (Add solution for challenge 3)
              <div
                key={index}
                className={`flex items-center  h-[62px] px-5 p rounded-[20px] cursor-pointer  ${
                  index % 2 == 0 ? "bg-[#F2F2F2]" : "bg-white hover:bg-gray-50"
                }`}
              >
                <div
                  className={`flex items-center gap-4 font-light   pr-4 ${
<<<<<<< HEAD
                    item.isActive ? "text-[#118AD3] " : "text-[rgba(0,0,0,.8)]"
                  }`}
                >
                  <span className="font-num">{item.endTime}</span>
                  <span className="font-num">{item.time}</span>
                </div>
                <div className="mr-6">
                  <span
                    className={`font-light ${
                      item.isActive
=======
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
>>>>>>> 0604e09 (Add solution for challenge 3)
                        ? "text-[#118AD3] "
                        : "text-[rgba(0,0,0,.8)]"
                    }`}
                  >
<<<<<<< HEAD
                    [{item.text}]
=======
                    [{item.text.length ? item.text : "---"}]
>>>>>>> 0604e09 (Add solution for challenge 3)
                  </span>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === "simple-text" && (
          <p className="font-light leading-[1.8] py-3">
<<<<<<< HEAD
            [با][---][---] [با] و[---][---] [با][---][---][---][---] کجایی تو
            [خوش] می دیدی من خسته شدم [ما را] [به] این [زودی] چه جوری شد [عشق
            شدی] به این است[---] [آخرش] سی با فکر [و] چقدر [نزار می خوام] که
            [چشم تو] [و با رفت][---][---][---][---][---][---][---][---] سخت
            [آرام] ولی ازت می خوام[---] بر نگردی هر کسی که به [تو] باشه[---]
            کاشکی تو منو [بردی] [که چشمک][---] با[---][---][---][---][---]
            [ابو][---] [با] و و و و و [او]
=======
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
>>>>>>> 0604e09 (Add solution for challenge 3)
          </p>
        )}
      </div>

      {/* Audio Player Controls */}
<<<<<<< HEAD
      <div className="bg-white  w-10/12 mx-auto pt-3 max-w-[520px] ">
        <div className="flex items-center gap-2 bg-[#f8f8f8] h-[34px] px-3 rounded-[10px]">
          {/* Volume Control */}
          <div className="flex items-center gap-1.5 ml-1.5">
            <div
              className="w-12 h-0.5 bg-gray-300 rounded-full relative cursor-pointer"
              dir="ltr"
            >
              <div
                className={`h-full ${
                  playerColor ? `bg-[${playerColor}]` : "bg-blue-500"
                } rounded-full`}
                style={{ width: `${volume * 100}%` }}
              ></div>
            </div>
            <Icon
              width={15}
              height={13}
              name="volume"
              className="text-current"
              color="#3d3d3d"
            />
          </div>
          {/* Progress Bar */}
          <div className="flex-1 flex items-center gap-4">
            <span className="text-sm font-light min-w-fit font-num text-[#3D3D3D]">
              00:02
            </span>
            <div
              ref={progressRef}
              className="flex-1 h-0.5 bg-gray-300 rounded-full cursor-pointer relative transition-all duration-100"
              dir="ltr"
              onClick={handleProgressClick}
            >
              <div
                className={`h-full ${
                  playerColor ? `bg-[${playerColor}]` : "bg-blue-500"
                } rounded-full relative`}
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div
                  className={`absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-[14px] h-[14px] ${
                    playerColor ? `bg-[${playerColor}]` : "bg-blue-500"
                  } rounded-full `}
                ></div>
              </div>
            </div>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="flex items-center justify-center transition-colors cursor-pointer w-4.5"
          >
            {isPlaying ? (
              <Icon
                width={7}
                height={12}
                name="pause"
                className="text-current"
                color="#3d3d3d"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4.5 text-[#3d3d3d]"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          {/* Pause Button (separate) */}
          <button className=" flex items-center justify-center transition-colors cursor-pointer">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="12" height="12" rx="2" fill="#3D3D3D" />
            </svg>
          </button>
        </div>
      </div>
=======
      <AudioPlayer
        playerColor={playerColor}
        audioUrl={url}
        durationAudio={duration}
        onActive={checkActivityContent}
      />
>>>>>>> 0604e09 (Add solution for challenge 3)
    </div>
  );
};

export default UploadContent;
