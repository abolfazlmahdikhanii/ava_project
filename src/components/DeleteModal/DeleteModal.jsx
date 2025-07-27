import React from "react";
<<<<<<< HEAD

const DeleteModal = ({ onClose, message, itemName, handleConfirm }) => {
=======
import { useDispatch, useSelector } from "react-redux";
import {
  getArchiveData,
  removeArchive,
  setRemoveContent,
} from "../../Redux/store/Transcribe";
import { toastOption } from "../../helper/helper";
import toast from "react-hot-toast";

const DeleteModal = () => {
  const {
    removeItem,
    pagination: { currentPage },
  } = useSelector((state) => state.transcribe);
  const dispatch = useDispatch();
  const removeRequestHandler = async () => {
    closeModalHandler();
    try {
    
      const removeAction = await dispatch(removeArchive(removeItem.id));
      if (removeArchive.fulfilled.match(removeAction)) {
        toast.success("حذف با موفقیت انجام شد", toastOption);
        dispatch(getArchiveData(currentPage));
      } else if (removeArchive.rejected.match(removeAction)) {
        toast.error("حذف با خطا مواجه شد ", toastOption);
      }
    } catch (error) {
      // Update toast to error
      toast.error("خطای پیش بینی نشده! لطفاً دوباره تلاش کنید", {
        ...toastOption,
      });
    }
  };
  const closeModalHandler = () => {
    dispatch(setRemoveContent(null));
  };
>>>>>>> 574ed32 (Add solution for challenge 4)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
<<<<<<< HEAD
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 p-6 rtl">
        {/* Close button */}
        <button
          onClick={onClose}
=======
        // onClick={closeModalHandler}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-[520px] w-full mx-4 p-6 rtl">
        {/* Close button */}
        <button
          onClick={closeModalHandler}
>>>>>>> 574ed32 (Add solution for challenge 4)
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">حذف</h3>
<<<<<<< HEAD
          <p className="text-gray-600 leading-relaxed">
            آیا مطمئن هستید که می‌خواهید {itemName} را حذف کنید؟
=======
          <p className="text-gray-600 leading-[1.8] flex items-center flex-wrap gap-1.5 justify-center">
            آیا مطمئن هستید که می‌خواهید{" "}
            <span
              className="underline inline-block max-w-[230px] truncate "
              dir="auto"
            >
              {removeItem.name}
            </span>{" "}
            را حذف کنید؟
>>>>>>> 574ed32 (Add solution for challenge 4)
          </p>
          <p className="text-sm text-gray-500 mt-4">
            این عمل قابل بازگشت نیست.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button
<<<<<<< HEAD
            onClick={handleConfirm}
=======
            onClick={removeRequestHandler}
>>>>>>> 574ed32 (Add solution for challenge 4)
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
          >
            حذف کردن
          </button>
          <button
<<<<<<< HEAD
            onClick={onClose}
=======
            onClick={closeModalHandler}
>>>>>>> 574ed32 (Add solution for challenge 4)
            className="px-6 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
