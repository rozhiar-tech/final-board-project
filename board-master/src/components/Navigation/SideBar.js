import React, { useState } from "react";

import { NavLink, useParams, useLocation } from "react-router-dom";
import ModeToggle from "../theme/ModeToggle";
import { motion } from "framer-motion";
import { getAuth, signOut } from "firebase/auth";
export default function SideBar({ theme, setTheme, userAuth, setUserAuth }) {
  const { projects } = useParams();

  const path = useLocation();
  console.log(path);
  console.log(projects);
  const pagesAuth = [
    {
      pageName: "Home",
      path: "/",
      iconFill: "home",
      icon: "home-outline",
    },
    {
      pageName: "Projects",
      path: "/projects",
      iconFill: "hourglass",
      icon: "hourglass-outline",
    },
    {
      pageName: "Add Project",
      path: "/addproject",
      iconFill: "add",
      icon: "add-outline",
    },
    {
      pageName: "Profile",
      path: "/profile",
      iconFill: "person",
      icon: "person-outline",
      const: useState(false),
    },
    {
      pageName: "Login",
      path: "/login",
      iconFill: "log-in",
      icon: "log-in-outline",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 1, translateX: -300 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.95, ease: "easeOut" }}
      className=" h-full pl-5 rounded-r-full overflow-hidden  dark:bg-[#3700b3] bg-[#6200ee] w-52  fixed  text-[#ffffff]"
    >
      <ul className="flex mx-5 flex-col h-full w-48 items-start font-Main justify-center gap-10">
        {pagesAuth.map((page) =>
          page.pageName === "Login" && userAuth ? (
            <button
              onClick={() => {
                //Logout from client ==> setUserAuth(false)
                //Write code logout from firebase
                const auth = getAuth();
              signOut(auth).then(() => {
                // Sign-out successful.
                console.log("Sign-out successful.");
              }).catch((error) => {
                // An error happened.
              });
              }}
              className="`transition-all  py-3 w-48 hover:px-5 transition-all duration-150 rounded-l-full hover:scale-110 hover:bg-[#b00020]  dark:hover:bg-[#cf6679] text-3xl  flex gap-3 justify-start items-center `"
            >
              <span className="text-xl">Logout</span>
              <ion-icon name="log-out-outline"></ion-icon>
            </button>
          ) : !userAuth && page.pageName === "Profile" ? (
            <li className="">
              <NavLink
                to={page.path}
                className={({ isActive }) =>
                  isActive
                    ? `  bg-[#ffffff]  dark:bg-[#121212] text-3xl duration-150 scale-110 transition-all text-[#018786] dark:text-[#03dac6] flex gap-3 justify-start items-center py-3 w-48 px-5 rounded-l-full `
                    : `transition-all  text-3xl  flex gap-3 justify-start items-center `
                }
              >
                <span className="text-xl"> {page.pageName}</span>
                <ion-icon
                  name={page.path === path.pathname ? page.iconFill : page.icon}
                ></ion-icon>
              </NavLink>
            </li>
          ) : (
            <li className="">
              <NavLink
                to={page.path}
                className={({ isActive }) =>
                  isActive
                    ? `  bg-[#ffffff]  dark:bg-[#121212] text-3xl duration-150 scale-110 transition-all text-[#018786] dark:text-[#03dac6] flex gap-3 justify-start items-center py-3 w-48 px-5 rounded-l-full `
                    : `transition-all  text-3xl  flex gap-3 justify-start items-center `
                }
              >
                <span className="text-xl"> {page.pageName}</span>
                <ion-icon
                  name={page.path === path.pathname ? page.iconFill : page.icon}
                ></ion-icon>
              </NavLink>
            </li>
          )
        )}
        <li className="">
          <ModeToggle theme={theme} setTheme={setTheme}></ModeToggle>
        </li>
      </ul>
    </motion.div>
  );
}
