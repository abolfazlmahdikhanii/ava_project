import { useEffect, useState } from "react";
import ArchiveItem from "../components/ArchiveItem/ArchiveItem";
import Pagination from "../components/Pagination/Pagination";
import { getUrlParam, toastOption } from "../helper/helper";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getArchiveData, removeArchive } from "../Redux/store/Transcribe";
import EmptyArchive from "../components/EmptyArchive/EmptyArchive";
import Loader from "../components/Loader/Loader";

export default function MyArchive() {
  const { archives, isLoading, pagination, removeItem } = useSelector(
    (state) => state.transcribe
  );
  const dispatch = useDispatch();
  const [openItemId, setOpenItem] = useState(null);

  useEffect(() => {
    fetchRequestData();
  }, []);
  const fetchRequestData = async () => {
    try {
      const archiveAction = await dispatch(
        getArchiveData(pagination.currentPage)
      );
      if (getArchiveData.rejected.match(archiveAction)) {
        toast.error("خطا در دریافت اطلاعات", {
          ...toastOption,
        });
      }
    } catch (error) {
      // Update toast to error
      toast.error("خطای پیش بینی نشده! لطفاً دوباره تلاش کنید", {
        ...toastOption,
      });
    }
  };

  return (
    <div className=" p-4  min-h-screen w-[94%] mx-auto">
      <h3 className="mt-1 mb-6 text-[24px] text-[#40C6B8]">آرشیو من</h3>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-700/20 backdrop-blur-lg z-[400]">
          <div className="fixed z-[500] bg-white rounded-lg px-2 flex flex-col items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] py-2.5 h-[150px] ">
            <div className="flex items-center justify-center gap-x-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="32"
                fill="none"
                viewBox="0 0 25 38"
                className="text-[#40C6B8]"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="3"
                  d="M10.5 1.5v35M20.5 11.5v15M1.5 11.5v15"
                ></path>
              </svg>
              <h1 className="text-[#40C6B8] font-bold text-[26px]">آوا</h1>
            </div>

            <div className="mt-2.5">
              <Loader />
            </div>
          </div>
        </div>
      )}
      {archives.length ? (
        <div className="bg-white rounded-lg  overflow-hidden">
          {/* Table Header */}
          <div className="">
            <div className="grid grid-cols-12 gap-x-9 px-4 pt-4 pb-7.5 text-sm ">
              <div className="col-span-1"></div>
              <div className="col-span-5 text-right">نام فایل</div>
              <div className="col-span-2 text-center">تاریخ بارگذاری</div>
              <div className="col-span-1 text-center">نوع فایل</div>
              <div className="col-span-1 text-center whitespace-nowrap">
                مدت زمان
              </div>
              <div className="col-span-2"></div>
            </div>
          </div>

          {/* Table Body */}
          <div className="w-full min-h-[250px]">
            {archives &&
              archives.map((file) => (
                <ArchiveItem key={file.id} {...file} isOpen={openItemId} />
              ))}
          </div>

          {/* Pagination */}

          {pagination && (
            <div className="mt-20">
              <Pagination />
            </div>
          )}
        </div>
      ) : (
        <EmptyArchive title="هیچ آرشیوی وجود ندارد !" />
      )}
      {removeItem && <DeleteModal />}
    </div>
  );
}
