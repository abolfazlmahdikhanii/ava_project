import React, { useEffect, useRef, useState } from "react";
import UploadContent from "../UploadContent/UploadContent";
import Icon from "../Icon/Icon";
import toast from "react-hot-toast";
import { isValidURL, toastOption } from "../../helper/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUploading,
  uploadFromUrl,
  uploadMedia,
} from "../../Redux/store/Transcribe";
import useAudioRecorder from "../../hooks/useAudioRecorder";
import Loader from "../Loader/Loader";

const UploadWrapper = ({ activeTab }) => {
  const { currentUpload, isLoading } = useSelector((state) => state.transcribe);
  const dispatch = useDispatch();
  const {
    isRecording,
    audioBlob,
    error,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder();

  const [mediaUrl, setMediaUrl] = useState("");

  let uploadContent = null;

  const fileInputRef = useRef(null);
  useEffect(() => {
    dispatch(resetUploading());
  }, [activeTab]);
  // Start recording function
  useEffect(() => {
    if (!isRecording && audioBlob) {
      uploadAudioHandler(audioBlob);
    }
  }, [isRecording, audioBlob]);
  // Stop recording function
  const toggleAudioHandler = async () => {
    if (isRecording) {
      stopRecording(); // This will trigger the blob creation
    } else {
      await startRecording();
    }
  };

  // Upload audio to API
  const uploadAudioHandler = async (blob) => {
    const audioFile = blob || audioBlob;
    if (!audioFile) {
      toast.error("لطفاً یک فایل صوتی انتخاب کنید", toastOption);
      return;
    }

    // Show loading toast and keep its reference
    const toastId = toast.loading("درحال ارسال درخواست...", toastOption);

    try {
      const audioAction = await dispatch(
        uploadMedia({ file: audioFile, type: "audio", isRecord: true })
      );
      if (uploadMedia.fulfilled.match(audioAction)) {
        toast.success("ارسال با موفقیت انجام شد", {
          ...toastOption,
          id: toastId,
        });
        resetRecording();
      } else if (uploadMedia.rejected.match(audioAction)) {
        toast.error("ارسال با خطا مواجه شد.دوباره تلاش کنید", {
          ...toastOption,
          id: toastId,
        });
      }
    } catch (error) {
  
      // Update toast to error
      toast.error("خطای پیش بینی نشده! لطفاً دوباره تلاش کنید", {
        ...toastOption,
        id: toastId,
      });
    }
  };

  const validateFileUploader = (file) => {
    if (!file) return;

    // Validate file type
    const validTypes = [
      "audio/wav",
      "audio/mp3",
      "audio/mpeg",
      "video/mp4",
      "video/webm",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error(
        "لطفاً یک فایل صوتی (wav, mp3) یا ویدیویی (mp4) انتخاب کنید",
        toastOption
      );
      fileInputRef.current.value = ""; // Reset input
      return;
    }

    // Validate file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      toast.error("حجم فایل نباید بیشتر از ۵۰ مگابایت باشد", toastOption);
      fileInputRef.current.value = ""; // Reset input
      return;
    }
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    validateFileUploader(file);
    // Start upload immediately
    const toastId = toast.loading("درحال آپلود فایل...", toastOption);

    try {
      const mediaAction = await dispatch(
        uploadMedia({ file, type: file.type, isRecord: false })
      );
      if (uploadMedia.fulfilled.match(mediaAction)) {
        toast.success("آپلود با موفقیت انجام شد", {
          ...toastOption,
          id: toastId,
        });
      } else if (uploadMedia.rejected.match(mediaAction)) {
        toast.error("خطا در آپلود فایل", {
          ...toastOption,
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("خطای پیش بینی نشده! لطفاً دوباره تلاش کنید", {
        ...toastOption,
        id: toastId,
      });
    } finally {
      fileInputRef.current.value = ""; // Reset input after upload
    }
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!isValidURL(mediaUrl)) {
      toast.error("لطفاً یک نشانی اینترنتی کنید", toastOption);
      return;
    }
    // Show loading toast and keep its reference
    const toastId = toast.loading("درحال ارسال درخواست...", toastOption);

    try {
      const urlAction = await dispatch(uploadFromUrl(mediaUrl));
      if (uploadFromUrl.fulfilled.match(urlAction)) {
        toast.success("ثبت نشانی اینترنتی با موفقیت انجام شد", {
          ...toastOption,
          id: toastId,
        });
        setMediaUrl("");
      } else if (uploadFromUrl.rejected.match(urlAction)) {
        toast.error("خطا در ثبت نشانی اینترنتی", {
          ...toastOption,
          id: toastId,
        });
      }
    } catch (error) {
      // Update toast to error
      toast.error("خطای پیش بینی نشده! لطفاً دوباره تلاش کنید", {
        ...toastOption,
        id: toastId,
      });
    }
  };

  switch (activeTab) {
    case "record":
      uploadContent = (
        <>
          <button
            className={`upload-wrapper__btn bg-[#00B3A1] rounded-full p-4 z-10 relative transition-colors duration-200 ${
              isRecording ? "recording-btn" : " hover:bg-[#00B3A1]/90"
            }`}
            onClick={toggleAudioHandler}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
            disabled={isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="34"
              fill="none"
              viewBox="0 0 20 34"
            >
              <path
                fill="#fff"
                d="m10 .639-.792.048-.777.147-.75.23-.723.326-.678.409-.623.486-.559.559-.486.623-.405.674-.33.722-.23.755-.147.776-.048.793v11.45l.048.788.147.774.23.757.33.722.405.674.486.624.56.559.622.486.678.409.722.326.751.233.777.14.792.052.786-.052.78-.14.754-.233.719-.326.68-.41.617-.485.56-.56.492-.623.406-.674.322-.722.237-.757.143-.774.045-.789V7.186l-.044-.792-.144-.776-.237-.755-.322-.722-.406-.674-.492-.623-.56-.56-.616-.485-.681-.41-.719-.325-.754-.23-.78-.147zM9.665 2.29h.67l.662.09.646.178.613.269.572.348.521.419.457.492.387.546.306.598.224.63.137.655.048.67v11.45l-.048.671-.137.652-.224.633-.306.591-.387.553-.457.489-.52.421-.573.349-.614.265-.645.182-.661.09h-.671L9 23.442l-.646-.182-.616-.265-.572-.349-.518-.421-.457-.49-.387-.552-.31-.591-.223-.633-.131-.652-.048-.67V7.186l.048-.671.13-.656.224-.63.31-.597.387-.546.457-.492.518-.419.572-.348.616-.269L9 2.38zM.18 18.636l.045.91.125.902.21.892.291.862.37.834.448.796.521.748.585.7.649.645.703.575.757.512.799.44.834.365.87.278.89.204.902.119v3.307H3.452v1.636h13.09v-1.636h-5.724v-3.307l.901-.119.892-.204.866-.278.84-.364.8-.441.756-.512.703-.575.646-.645.588-.7.518-.748.447-.796.367-.834.294-.862.211-.892.128-.901.039-.91H18.18l-.048.852-.135.847-.217.828-.31.799-.387.763-.47.72-.536.66-.607.608-.665.54-.719.463-.76.393-.8.304-.83.224-.84.134-.857.042-.856-.042-.847-.134-.825-.224-.799-.304-.766-.393-.716-.463-.668-.54-.607-.607-.537-.662-.463-.719-.39-.763-.307-.8-.224-.827-.134-.847-.042-.853z"
              ></path>
            </svg>
          </button>
          {!isRecording ? (
            <p className="w-[276px] font-light text-[#626262] mt-[12px] text-center leading-[1.8]">
              برای شروع به صحبت، دکمه را فشار دهید متن پیاده شده آن، در اینجا
              ظاهر شود
            </p>
          ) : (
            <>
              <p className="w-[276px] font-light text-[#626262] mt-[12px] text-center leading-[1.8]">
                در حال ظبط صدا ...
              </p>
              <p className="w-[276px] font-light text-[14px] text-[#626262] mt-[2px] text-center leading-[1.8]">
                برای توقف ظبط کافیست روی دکمه کلیک کنید
              </p>
            </>
          )}
        </>
      );
      break;
    case "upload":
      uploadContent = (
        <>
          <label
            htmlFor="upload-file"
            className="upload-wrapper__btn bg-[#118AD3] hover:bg-[#118AD3]/90 "
          >
            <input
              type="file"
              id="upload-file"
              className="hidden"
              accept="audio/*,video/*"
              onChange={handleFileChange}
              disabled={isLoading}
              ref={fileInputRef}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="28"
              fill="none"
              viewBox="0 0 33 28"
            >
              <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m21.719 19.62-5.439-5.44-5.439 5.44M16.28 14.18v12.238"
              ></path>
              <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M27.687 22.869a6.797 6.797 0 0 0-3.25-12.767h-1.713a10.877 10.877 0 1 0-18.681 9.925"
              ></path>
              <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m21.719 19.62-5.439-5.44-5.439 5.44"
              ></path>
            </svg>
          </label>
          <p className="w-[415px] font-light text-[#626262] mt-[12px] text-center leading-[1.8]">
            برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید متن پیاده
            شده آن، در اینجا ظاهر می شود
          </p>
        </>
      );
      break;
    case "url":
      uploadContent = (
        <>
          <form
            onSubmit={handleUrlSubmit}
            className="w-[328px] rounded-full border-[0.5px] border-[#FF1654] py-1.5 h-[46px] overflow-hidden flex items-center justify-end gap-x-3 pl-4.5"
          >
            <input
              type="text"
              className="w-[80%] h-full text-gray-700 placeholder:font-light placeholder:text-[#626262] outline-0"
              dir="auto"
              placeholder="example.com/sample.mp3"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value.trim())}
            />
            <button className="w-[30px] h-[30px] grow-0 bg-[#FF1654] text-white grid place-items-center rounded-full cursor-pointer">
              <Icon
                width={14}
                height={17}
                name="link"
                className="text-white"
                color="none"
              />
            </button>
          </form>
          <p className="w-[415px] font-light text-[#626262] mt-[13px] text-center leading-[1.8] ">
            نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد <br />و دکمه را
            فشار دهید
          </p>
        </>
      );
      break;
    default:
      break;
  }
  return (
    <div
      className={`h-[429px] w-full ${activeTab}--active transition-all relative overflow-hidden ${
        activeTab === "record"
          ? "rounded-[25px] rounded-tr-none"
          : "rounded-[25px] "
      }`}
    >
      {isLoading && (
        <div className="w-full h-full bg-gray-300/20 backdrop-blur-md absolute inset-0 grid place-items-center z-20">
          <div>
            <Loader />
          </div>
        </div>
      )}
      {!currentUpload ? (
        <div className="flex flex-col items-center justify-center h-full">
          {uploadContent}
        </div>
      ) : (
        <div className=" py-2 px-5">
          <UploadContent />
        </div>
      )}
    </div>
  );
};

export default UploadWrapper;
