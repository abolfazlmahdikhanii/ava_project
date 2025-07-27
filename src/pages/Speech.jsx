<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useRef, useState } from "react";
>>>>>>> 0604e09 (Add solution for challenge 3)
=======
import React, { useRef, useState } from "react";
>>>>>>> 574ed32 (Add solution for challenge 4)
import UploadTab from "../components/UploadTab/UploadTab";
import UploadWrapper from "../components/UploadWrapper/UploadWrapper";
import Dropdown from "../components/Dropdown/Dropdown";

<<<<<<< HEAD
<<<<<<< HEAD

const Speech = () => {
  const [activeTab, setActiveTab] = useState("record");
=======
=======
>>>>>>> 574ed32 (Add solution for challenge 4)
const Speech = () => {
  const [activeTab, setActiveTab] = useState("record");


  const [selectedLanguage, setSelectedLanguage] = useState("persian");

 
<<<<<<< HEAD
>>>>>>> 0604e09 (Add solution for challenge 3)
=======
>>>>>>> 574ed32 (Add solution for challenge 4)
  return (
    <section className="mt-[10px] w-full flex flex-col ">
      {/* title */}
      <div className="flex flex-col justify-center items-center gap-y-2 max-w-[442px] self-center">
        <h4 className="text-[28px] font-bold text-[#00ba9f] font-sans">
          {" "}
          تبدیل گفتار به متن
        </h4>
        <p className="text-[#969696] text-center leading-[1.8]">
          آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف،
          <br /> زبان فارسی را یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسد.
        </p>
      </div>
      {/* content */}
      <div className="mt-[61px] w-[51%] max-w-[653px] mx-auto ">
        <div
          className={`flex items-center gap-5 ${
            activeTab === "record" ? "mr-0" : "mr-3.5"
          } `}
        >
          <UploadTab
            title="ظبط صدا"
            value="record"
            onActive={setActiveTab}
            activeTab={activeTab}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="22"
              fill="none"
              viewBox="0 0 13 22"
            >
              <path
                fill="currentColor"
                d="m6.502 0-.525.032-.514.097-.497.152-.478.216-.449.271-.412.322-.37.37-.322.413-.269.446-.218.478-.152.5-.098.514-.031.525v7.582l.031.523.098.512.152.501.218.478.269.447.321.412.37.37.413.322.449.271.478.216.497.155.514.093.525.034.52-.034.517-.093.5-.155.475-.216.451-.27.408-.322.37-.37.326-.413.27-.447.213-.478.157-.501.095-.512.03-.523V4.336l-.03-.525-.095-.514-.157-.5-.214-.478-.268-.446-.326-.413-.37-.37-.409-.322-.45-.27L8.037.28l-.5-.152-.515-.097zM6.28 1.094h.444l.438.06.428.118.406.178.379.23.345.277.302.326.256.362.203.396.148.417.091.434.032.444v7.582l-.032.444-.09.432-.149.419-.203.391-.256.367-.302.323-.345.28-.38.23-.405.176-.428.12-.438.06H6.28l-.44-.06-.428-.12-.408-.176-.379-.23-.342-.28-.303-.324-.256-.366-.205-.391-.148-.42-.087-.43-.032-.445V4.336l.032-.444.087-.434.148-.417.205-.396.256-.362.303-.326.342-.277.38-.23.407-.178.428-.119zM0 11.918l.03.603.082.597.14.59.192.572.246.552.296.527.345.495.387.463.43.428.465.38.502.34.529.291.552.241.575.184.59.136.597.078v2.19H2.167v1.084h8.666v-1.084h-3.79v-2.19l.597-.078.59-.136.574-.184.557-.24.529-.293.501-.338.466-.381.427-.428.39-.463.342-.495.296-.527.244-.553.194-.57.14-.591.085-.597.025-.603h-1.081l-.032.565-.089.56-.144.549-.205.529-.256.505-.311.477-.355.438-.402.402-.44.357-.477.307-.503.26-.53.201-.55.149-.556.088-.567.028-.567-.027-.56-.09-.547-.148-.529-.2-.507-.26-.474-.308-.443-.357-.402-.402-.355-.438-.307-.476-.258-.506-.203-.53-.148-.547-.089-.561-.028-.565z"
              ></path>
            </svg>
          </UploadTab>
          <UploadTab
            title="بارگذاری فایل"
            value="upload"
            onActive={setActiveTab}
            activeTab={activeTab}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="17"
              fill="none"
              viewBox="0 0 20 17"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m13.504 11.831-3.333-3.333-3.333 3.333M10.171 8.498v7.5"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.163 13.823a4.167 4.167 0 0 0-1.992-7.825h-1.05a6.667 6.667 0 1 0-11.45 6.083"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m13.504 11.831-3.333-3.333-3.333 3.333"
              ></path>
            </svg>
          </UploadTab>
          <UploadTab
            title="لینک"
            value="url"
            onActive={setActiveTab}
            activeTab={activeTab}
          >
<<<<<<< HEAD
<<<<<<< HEAD
     
=======
>>>>>>> 0604e09 (Add solution for challenge 3)
=======
>>>>>>> 574ed32 (Add solution for challenge 4)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="21"
              fill="none"
              viewBox="0 0 17 21"
            >
              <path
                fill="currentColor"
                d="m7.806 4.145 2.224-2.224a3.36 3.36 0 0 1 4.742.262c1.144 1.243 1.144 3.172 0 4.447l-2.257 2.224.687.687 2.257-2.256c1.667-1.668 1.602-4.415-.099-6.083a4.326 4.326 0 0 0-5.984 0L7.119 3.426a4.363 4.363 0 0 0 0 6.115l.687-.687a3.376 3.376 0 0 1 0-4.709M7.414 19.058l2.256-2.224c1.668-1.7 1.668-4.415 0-6.083l-.687.687a3.316 3.316 0 0 1 0 4.709L6.727 18.37a3.316 3.316 0 0 1-4.71 0 3.316 3.316 0 0 1 0-4.71l2.257-2.223-.687-.687-2.223 2.224c-1.734 1.635-1.832 4.35-.197 6.083s4.35 1.83 6.083.196c.066-.098.131-.131.164-.197"
              ></path>
              <path
                fill="currentColor"
                d="m11.483 7.796-.693-.694-5.411 5.41.693.695z"
              ></path>
            </svg>
          </UploadTab>
        </div>

<<<<<<< HEAD
<<<<<<< HEAD
        <UploadWrapper activeTab={activeTab} />
=======
        <UploadWrapper activeTab={activeTab}  />
>>>>>>> 0604e09 (Add solution for challenge 3)
=======
        <UploadWrapper activeTab={activeTab}  />
>>>>>>> 574ed32 (Add solution for challenge 4)
        <div className="flex items-center gap-x-4 justify-end mt-4">
          <p className="text-[#626262] text-sm font-light">زبان گفتار :</p>
          <Dropdown
            type="select"
            items={[
              { id: crypto.randomUUID(), text: "فارسی", value: "persian" },
              {
                id: crypto.randomUUID(),
                text: "انگلیسی",
                value: "english",
              },
            ]}
            size={" w-[105px]"}
          />
        </div>
      </div>
    </section>
  );
};

export default Speech;
