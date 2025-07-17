import { useState } from "react";
import ArchiveItem from "../components/ArchiveItem/ArchiveItem";
import Pagination from "../components/Pagination/Pagination";

export default function MyArchive() {
  const [openItemId, setOpenItemId] = useState(null);

  const files = [
    {
      id: 1,
      name: "https://rrsv.upmusics.com/Downloads/Musics/Sirvan%20K...",
      uploadDate: "۱۴۰۰/۰۸/۲۱",
      fileType: ".mp3",
      duration: "۴:۰۹",
      status: "success",
      uploadType: "link",
    },
    {
      id: 2,
      name: "khaterate To",
      uploadDate: "۱۴۰۰/۰۸/۲۰",
      fileType: ".mp4",
      duration: "۴:۲۸",
      status: "info",
      uploadType: "upload",
    },
    {
      id: 3,
      name: "https://dls.loudmusic.ir/Music/1401/01/Beraye%20-Shervin...",
      uploadDate: "۱۴۰۰/۰۸/۲۰",
      fileType: ".wav",
      duration: "۳:۱４",
      status: "success",
      uploadType: "link",
    },
    {
      id: 4,
      name: "پادکست رادیو راه - فصل دوم -قسمت ششم- راه سروش",
      uploadDate: "۱۴۰۰/۰۸/۱۹",
      fileType: ".mp3",
      duration: "۱:۲۸:۱۸",
      status: "warning",
      uploadType: "record",
    },
    {
      id: 5,
      name: "https://rrsv.upmusics.com/Downloads/Musics/Sirvan%20K...",
      uploadDate: "۱۴۰۰/۰۸/۲۱",
      fileType: ".mp3",
      duration: "۱:۲۸:۱۸",
      status: "success",
      uploadType: "link",
    },
    {
      id: 6,
      name: "khaterate To",
      uploadDate: "۱۴۰۰/۰۸/۲۰",
      fileType: ".mp4",
      duration: "۴:۲۸",
      status: "info",
      uploadType: "upload",
    },
    {
      id: 7,
      name: "https://dls.loudmusic.ir/Music/1401/01/Beraye%20-Shervin...",
      uploadDate: "۱۴۰۰/۰۸/۲۰",
      fileType: ".wav",
      duration: "۳:۱۴",
      status: "success",
      uploadType: "link",
    },
    {
      id: 8,
      name: "پادکست رادیو راه - فصل دوم -قسمت ششم- راه سروش",
      uploadDate: "۱۴۰۰/۰۸/۱۹",
      fileType: ".mp3",
      duration: "۱:۲۸:۱۸",
      status: "warning",
      uploadType: "record",
    },
  ];

  return (
    <div className=" p-4  min-h-screen w-[94%] mx-auto">
      <h3 className="mt-1 mb-6 text-[24px] text-[#40C6B8]">آرشیو من</h3>
      <div className="bg-white rounded-lg  overflow-hidden">
        {/* Table Header */}
        <div className="">
          <div className="grid grid-cols-11 gap-2 px-4 pt-4 pb-7.5 text-sm ">
            <div className="col-span-1"></div>
            <div className="col-span-5 text-right">نام فایل</div>
            <div className="col-span-1 text-center">تاریخ بارگذاری</div>
            <div className="col-span-1 text-center">نوع فایل</div>
            <div className="col-span-1 text-center">مدت زمان</div>
            <div className="col-span-2"></div>
          </div>
        </div>

        {/* Table Body */}
        <div className="w-full" >
          {files.map((file) => (
            <ArchiveItem
              key={file.id}
              {...file}
              isOpen={openItemId}
              setIsOpen={setOpenItemId}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-20">
          <Pagination />
        </div>
      </div>
    </div>
  );
}
