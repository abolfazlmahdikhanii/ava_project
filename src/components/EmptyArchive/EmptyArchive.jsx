import React from "react";

const EmptyArchive = ({ title, subtitle }) => {
  return (
    <div className={"emptyContent"}>
      <img src={"./empty-ad.png"} alt="icon " />
      <div className={"emptyInfo"}>
        <h5 className={"emptyTitle"}>{title}</h5>
        <p className={"emptyDesc"}>{subtitle}</p>
      </div>
    </div>
  );
};

export default EmptyArchive;
