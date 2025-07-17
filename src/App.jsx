<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";

=======
=======
>>>>>>> c51ed5d (Add solution for challenge 2)
import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dropdown from "./components/Dropdown/Dropdown";
import Speech from "./pages/Speech";
import MyArchive from "./pages/MyArchive";
import Icon from "./components/Icon/Icon";
<<<<<<< HEAD
>>>>>>> 71d7a50 (Add solution for challenge)

const App = () => {
  return (
    <div className="grid grid-cols-[166px_1fr] w-full">
<<<<<<< HEAD
      
=======
=======
import { useRoutes } from "react-router-dom";
import routes from "./routes";

const App = () => {
  const route = useRoutes(routes);
  return (
    <div className="grid grid-cols-[166px_1fr] w-full">
>>>>>>> c51ed5d (Add solution for challenge 2)
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
<<<<<<< HEAD
                  icon: <Icon width={14} height={15} name="logout" color="none" className="text-[#00BA9F]" />,
=======
                  icon: (
                    <Icon
                      width={14}
                      height={15}
                      name="logout"
                      color="none"
                      className="text-[#00BA9F]"
                    />
                  ),
>>>>>>> c51ed5d (Add solution for challenge 2)
                },
              ]}
              size={"w-[121px]"}
            >
<<<<<<< HEAD
              <Icon width={20} height={19} name="user" color="none" className="text-[#00BA9F]" />
=======
              <Icon
                width={20}
                height={19}
                name="user"
                color="none"
                className="text-[#00BA9F]"
              />
>>>>>>> c51ed5d (Add solution for challenge 2)
            </Dropdown>
          </div>
        </header>
        {/* main Content */}
<<<<<<< HEAD
        <Speech />
        {/* <MyArchive/> */}
      </main>
>>>>>>> 71d7a50 (Add solution for challenge)
=======
        {route}
        {/* <MyArchive/> */}
      </main>
>>>>>>> c51ed5d (Add solution for challenge 2)
    </div>
  );
};

export default App;
