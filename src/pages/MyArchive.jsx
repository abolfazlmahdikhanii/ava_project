import { useEffect, useState } from "react";
import ArchiveItem from "../components/ArchiveItem/ArchiveItem";
import Pagination from "../components/Pagination/Pagination";
import { getUrlParam, toastOption } from "../helper/helper";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import toast from "react-hot-toast";

export default function MyArchive() {
  const [openItemId, setOpenItemId] = useState(null);
  const [archiveData, setArchiveData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteItem, setIsDeleteItem] = useState(null);
  useEffect(() => {
    fetchRequestData();
  }, []);
  const fetchRequestData = async (page) => {
    const defaultUrl = `https://harf.roshan-ai.ir/api/requests/`;
    setLoading(true);
    try {
      const response = await fetch(
        page ? `${defaultUrl}?page=${page}` : defaultUrl,
        {
          method: "GET",
          headers: {
            Authorization: "Token a85d08400c622b50b18b61e239b9903645297196",
          },
        }
      );
      if (!response.ok) throw new Error("مشکل در دریافت اطلاعات");
      const results = await response.json();
      setLoading(false);
      setArchiveData(results);
      setPagination({
        currentPage: page
          ? getUrlParam(
              `https://harf.roshan-ai.ir/api/requests/?page=${page}`,
              "page"
            )
          : 1,
        nextUrl: results.next,
        prevUrl: results.previous,
        count: results.count,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setArchiveData([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };
  const removeRequestHandler = () => {
    setIsDeleteItem(null);
    fetch(`https://harf.roshan-ai.ir/api/requests/${isDeleteItem.id}/`, {
      method: "DELETE",
      headers: {
        Authorization: "Token a85d08400c622b50b18b61e239b9903645297196",
      },
    })
      .then((res) => {
        if (res.ok) {
          toast.success("حذف با موفقیت انجام شد", toastOption);
          fetchRequestData(pagination.currentPage);
        } else {
          throw Error;
        }
      })
      .catch((error) => {
        toast.error("حذف با خطا مواجه شد ", toastOption);
      });
  };
 

  return (
    <div className=" p-4  min-h-screen w-[94%] mx-auto">
      <h3 className="mt-1 mb-6 text-[24px] text-[#40C6B8]">آرشیو من</h3>
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
          {archiveData.results &&
            archiveData.results.map((file) => (
              <ArchiveItem
                key={file.id}
                {...file}
                isOpen={openItemId}
                setIsOpen={setOpenItemId}
                onDelete={setIsDeleteItem}
             
                
              />
            ))}
        </div>

        {/* Pagination */}
        <div className="mt-20">
          <Pagination {...pagination} onPageChange={fetchRequestData} />
        </div>
      </div>
      {isDeleteItem && (
        <DeleteModal
          onClose={() => setIsDeleteItem(null)}
          itemName={isDeleteItem.name}
          handleConfirm={removeRequestHandler}
        />
      )}
    </div>
  );
}
