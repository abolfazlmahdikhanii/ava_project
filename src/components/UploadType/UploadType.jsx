import React from "react";
import Icon from "../Icon/Icon";

const UploadType = ({ type }) => {
  return (
    <>
      {type === "link" && (
        <div
          className={`upload-type bg-[#FF1654]`}
        >
          <Icon width={15} height={18} name="link" className="text-white" />
        </div>
      )}
      {type === "upload" && (
        <div
          className={`upload-type bg-[#118AD3]`}
        >
          <Icon
            width={17}
            height={14}
            name="upload"
            className="stroke-current"
            color="none"
          />
        </div>
      )}
      {type === "record" && (
        <div
          className={`upload-type bg-[#40C6B8]`}
        >
          <Icon width={11} height={19} name="record" className="text-white" />
        </div>
      )}
    </>
  );
};

export default UploadType;
