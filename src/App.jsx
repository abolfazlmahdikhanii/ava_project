import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dropdown from "./components/Dropdown/Dropdown";
import Speech from "./pages/Speech";
import MyArchive from "./pages/MyArchive";
import Icon from "./components/Icon/Icon";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

const App = () => {
  const route = useRoutes(routes);
  return (
    <div className="grid grid-cols-[166px_1fr] w-full">
      <Sidebar />
      <main className="w-11/12 mx-auto mb-[330px]">
        <header className="flex items-center justify-end">
          <div className=" mt-[55px] ">
            <Dropdown
              title="مهمان"
              items={[
                {
                  id: crypto.randomUUID(),
                  text: "خروج",
                  icon: (
                    <Icon
                      width={14}
                      height={15}
                      name="logout"
                      color="none"
                      className="text-[#00BA9F]"
                    />
                  ),
                },
              ]}
              size={"w-[121px]"}
            >
              <Icon
                width={20}
                height={19}
                name="user"
                color="none"
                className="text-[#00BA9F]"
              />
            </Dropdown>
          </div>
        </header>
        {/* main Content */}
        {route}
        {/* <MyArchive/> */}
      </main>
    </div>
  );
};

export default App;
