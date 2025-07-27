<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";

=======
=======
>>>>>>> c51ed5d (Add solution for challenge 2)
=======
>>>>>>> 0604e09 (Add solution for challenge 3)
import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dropdown from "./components/Dropdown/Dropdown";
import Speech from "./pages/Speech";
import MyArchive from "./pages/MyArchive";
import Icon from "./components/Icon/Icon";
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 71d7a50 (Add solution for challenge)

const App = () => {
  return (
    <div className="grid grid-cols-[166px_1fr] w-full">
<<<<<<< HEAD
      
=======
=======
=======
import { Toaster } from "react-hot-toast";
>>>>>>> 0604e09 (Add solution for challenge 3)
import { useRoutes } from "react-router-dom";
import routes from "./routes";

const App = () => {
  const route = useRoutes(routes);
  return (
    <div className="grid grid-cols-[166px_1fr] w-full">
<<<<<<< HEAD
>>>>>>> c51ed5d (Add solution for challenge 2)
=======
>>>>>>> 0604e09 (Add solution for challenge 3)
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
<<<<<<< HEAD
                  icon: <Icon width={14} height={15} name="logout" color="none" className="text-[#00BA9F]" />,
=======
=======
>>>>>>> 0604e09 (Add solution for challenge 3)
                  icon: (
                    <Icon
                      width={14}
                      height={15}
                      name="logout"
                      color="none"
                      className="text-[#00BA9F]"
                    />
                  ),
<<<<<<< HEAD
>>>>>>> c51ed5d (Add solution for challenge 2)
=======
>>>>>>> 0604e09 (Add solution for challenge 3)
                },
              ]}
              size={"w-[121px]"}
            >
<<<<<<< HEAD
<<<<<<< HEAD
              <Icon width={20} height={19} name="user" color="none" className="text-[#00BA9F]" />
=======
=======
>>>>>>> 0604e09 (Add solution for challenge 3)
              <Icon
                width={20}
                height={19}
                name="user"
                color="none"
                className="text-[#00BA9F]"
              />
<<<<<<< HEAD
>>>>>>> c51ed5d (Add solution for challenge 2)
=======
>>>>>>> 0604e09 (Add solution for challenge 3)
            </Dropdown>
          </div>
        </header>
        {/* main Content */}
<<<<<<< HEAD
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
=======
        {route}
        {/* <MyArchive/> */}
      </main>
      <Toaster />
>>>>>>> 0604e09 (Add solution for challenge 3)
    </div>
  );
};

export default App;
