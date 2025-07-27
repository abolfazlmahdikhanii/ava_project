import React, { useEffect, useRef, useState } from "react";
import Icon from "../Icon/Icon";
import { formatDuration, formatTime, toastOption } from "../../helper/helper";
import toast from "react-hot-toast";

const AudioPlayer = ({ playerColor, audioUrl, durationAudio, onActive }) => {
  const progressRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(durationAudio || 0);
  const [volume, setVolume] = useState(0.7);
  const [isError, setIsError] = useState(false);
  const volumeRef = useRef(null);

  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        toast.error("خطا در پخش فایل", toastOption);
        setIsError(true);
      });
    }
    setIsPlaying(!isPlaying);
  };
  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };
  const handleProgressClick = (e) => {
    if (!isError) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.min(1, Math.max(0, clickX / rect.width));
      const newTime = percentage * duration;

      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
    }
  };
  const handleLoadedMetadata = (e) => {
    const audio = e.target;
    audio.volume = volume;
    setDuration(audio.duration);
    console.log(audio.duration);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;

    setCurrentTime(audio.currentTime);
    onActive(audio.currentTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const updateVolume = (e) => {
    const rect = volumeRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.min(1, Math.max(0, clickX / rect.width));

    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };
  return (
    <div className="bg-white  w-10/12 mx-auto pt-3 max-w-[520px] ">
      <div className="flex items-center gap-2 bg-[#f8f8f8] h-[34px] px-3 rounded-[10px]">
        {/* Volume Control */}
      
        <audio
          ref={audioRef}
          src={audioUrl}

          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          className="hidden"
        />

        <div className="flex items-center gap-1.5 ml-1.5">
          <div
            ref={volumeRef}
            className="w-12 h-0.5 bg-gray-300 rounded-full relative cursor-pointer"
            dir="ltr"
            onClick={updateVolume}
          >
            <div
              className={`h-full ${
                playerColor ? `bg-[${playerColor}]` : "bg-blue-500"
              } rounded-full`}
              style={{ width: `${volume * 100}%` }}
            ></div>
          </div>
          <p className="w-3.5">
            {volume > 0 ? (
              <Icon
                width={16}
                height={13}
                name="volume"
                className="text-current"
                color="#3d3d3d"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-[16.1px]"
              >
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
              </svg>
            )}
          </p>
        </div>
        {/* Progress Bar */}
        <div className="flex-1 flex items-center ">
          <span className="text-sm font-light min-w-[35px] font-num text-[#3D3D3D]">
            {!isPlaying && currentTime === 0
              ? formatDuration(durationAudio)
              : formatTime(currentTime)}
          </span>
          <div
            ref={progressRef}
            className="flex-1 h-0.5 bg-gray-300 rounded-full cursor-pointer relative  w-[345px] ml-1.5 mr-1"
            dir="ltr"
            onClick={handleProgressClick}
          >
            <div
              className={`h-full ${
                playerColor ? `bg-[${playerColor}]` : "bg-blue-500"
              } rounded-full relative`}
              style={{
                width: `${
                  currentTime > 0 && (duration || durationAudio)
                    ? (currentTime / duration) * 100
                    : 0
                }%`,
              }}
            >
              <div
                className={`absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-[14px] h-[14px] ${
                  playerColor ? `bg-[${playerColor}]` : "bg-blue-500"
                } rounded-full `}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="flex items-center justify-center transition-colors cursor-pointer "
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4.5"
              >
                <path
                  fillRule="evenodd"
                  d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                  clipRule="evenodd"
                />
              </svg>
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
          <button
            className=" flex items-center justify-center transition-colors cursor-pointer "
            onClick={handleStop}
          >
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
    </div>
  );
};

export default AudioPlayer;
